import { formatDate } from '@common/helpers/helpers';
import { FilesService } from '@modules/files/files.service';
import { Order } from '@modules/orders/entities/order.entity';
import { Injectable } from '@nestjs/common';
import { jsPDF, TextOptionsLight } from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface index {
    Index: string;
    Page: number;
}

export interface TextOptions extends TextOptionsLight {
    x?: number;
    y?: number;
    addToIndex?: boolean;
}

@Injectable()
export class PdfService {
    private doc: jsPDF;
    private readonly xMargin = 20;
    private readonly yMargin = 30;
    private filePath = './output.pdf';
    private indexData: index[] = [];
    private x: number;
    private y: number;

    constructor(private readonly filesService: FilesService) {
        this.doc = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: 'a4',
        });
        this.resetXandY();
        this.updatePointer();
    }

    async generateOrderPdf(order: Order) {
        this.doc = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: 'a4',
        });
        this.resetXandY();
        this.updatePointer();

        this.doc.setFont('Helvetica');

        const items = order.items.getItems();

        for (const item of items) {
            this.doc.setFontSize(16);
            this.addText(`Order: ${String(order.orderNumber).toUpperCase()}`, {
                x: this.xMargin,
                y: this.yMargin,
            });

            this.addText('Render of drone', {
                x: this.doc.internal.pageSize.width - 200 - this.xMargin,
                y: this.yMargin,
            });

            const droneRender = await this.filesService.getPublicFileBuffer(
                item.product.image,
            );
            this.addImage(droneRender.toString('base64'), {
                width: 200,
                height: 200,
                x: this.doc.internal.pageSize.width - 200 - this.xMargin,
                y: this.y + 10,
            });

            this.addNewLine();

            this.y = this.yMargin + 10;
            this.updatePointer();

            autoTable(this.doc, {
                startY: this.y,
                tableWidth: this.doc.internal.pageSize.width - 300,
                head: [['Parameter', 'Value']],
                body: [
                    ['Purpose', item.product.purpose],
                    ['Wings type', item.product.wingsType],
                    ['Length', `${String(item.length)} cm`],
                    ['Width', `${String(item.width)} cm`],
                    ['Payload capacity', `${String(item.payloadCapacity)} kg`],
                    ['Flight distance', `${String(item.flightDistance)} km`],
                    ['Flight time', `${String(item.flightTime)} m`],
                    ['Power source', String(item.powerSource)],
                    ['Material type', String(item.materialType)],
                    [
                        'Additional equipment',
                        String(
                            Object.keys(item.additionalEquipment).filter(
                                (key) => item.additionalEquipment[key] === true,
                            ),
                        ).replace(/,/g, ', '),
                    ],
                    ['Color', item.color.toUpperCase()],
                    ['Amount', String(item.amount)],
                ],
            });

            this.addText('Manager information', {
                x: this.xMargin,
                y: 280,
            });

            autoTable(this.doc, {
                startY: 290,
                tableWidth: this.doc.internal.pageSize.width - 450,
                head: [['Parameter', 'Value']],
                body: [
                    [
                        'Name',
                        order.manager.details.firstName +
                            ' ' +
                            order.manager.details.lastName,
                    ],
                    ['Email', order.manager.email],
                    ['Phone', order.manager.details.phone],
                ],
            });

            this.addText('Additional information', {
                x: this.doc.internal.pageSize.width - 400,
                y: 280,
            });

            this.doc.setFontSize(10);
            if (item.additionalInfo) {
                this.addText(item.additionalInfo, {
                    x: this.doc.internal.pageSize.width - 400,
                    y: 300,
                    maxWidth: 400,
                });
            } else {
                this.addText('No additional information provided', {
                    x: this.doc.internal.pageSize.width - 400,
                    y: 295,
                });
            }

            this.doc.setFontSize(16);

            if (item.coatingTexture) {
                const coatingTextureBuffer =
                    await this.filesService.getPublicFileBuffer(
                        item.coatingTexture,
                    );
                this.addText('Coating texture', {
                    x: this.doc.internal.pageSize.width - 200 - this.xMargin,
                    y: 280,
                });

                this.addImage(coatingTextureBuffer.toString('base64'), {
                    width: 120,
                    height: 120,
                    y: 290,
                    x: this.doc.internal.pageSize.width - 200 - this.xMargin,
                });
            }

            this.addText(`Date: ${formatDate(order.createdAt)}`, {
                x: this.xMargin,
                y: this.doc.internal.pageSize.height - 20,
            });

            if (items.indexOf(item) !== items.length - 1) {
                this.addNewPage();
            }
        }

        this.filePath = `order-${order.orderNumber}.pdf`;
        return await this.render();
    }

    private updatePointer() {
        this.doc.moveTo(this.x, this.y);
    }

    private resetXandY() {
        this.x = this.xMargin;
        this.y = this.yMargin;
    }

    private addNewPage() {
        this.doc.addPage();
        this.resetXandY();
        this.updatePointer();
    }

    private addImage(
        imageData: string,
        options?: {
            x?: number;
            y?: number;
            width?: number;
            height?: number;
        },
    ) {
        this.doc.addImage(
            imageData,
            'JPEG',
            options?.x || this.x,
            options?.y || this.y,
            options?.width || this.doc.internal.pageSize.getWidth(),
            options?.height || this.doc.internal.pageSize.getHeight(),
        );

        this.y = options?.height || this.doc.internal.pageSize.getHeight();
        +this.doc.getLineHeight();
        this.updatePointer();
    }

    private addText(text: string, options?: TextOptions) {
        const lines = this.doc.splitTextToSize(
            text,
            this.doc.internal.pageSize.width - this.xMargin * 2,
        );

        if (options?.addToIndex) {
            this.indexData.push({
                Index: text,
                Page: this.doc.getCurrentPageInfo().pageNumber,
            });
        }
        this.doc.text(lines, options?.x || this.x, options?.y || this.y);
        this.y = this.doc.getTextDimensions(lines).h + this.doc.getLineHeight();
        this.updatePointer();
    }

    private addNewLine() {
        this.y += this.doc.getLineHeight();
        this.x = this.xMargin;
        this.updatePointer();
    }

    private render(): Promise<string> {
        return new Promise<string>((resolve) => {
            this.doc.save(this.filePath);
            resolve(this.filePath);
        });
    }
}
