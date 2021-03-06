import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { gridData1 } from './data';
import { ToolbarService, EditService, PageService, GridComponent } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'my-app',
    template: `<ej-grid [dataSource]='data' [allowPaging]='true' [pageSettings]='pageSettings' [editSettings]='editSettings' [toolbar]='toolbar'
    (actionComplete)='actionComplete($event)'>
                <e-columns>
                    <e-column field='OrderID' headerText='Order ID' width='120' textAlign="right" [isPrimaryKey]='true' [validationRules]='orderidrules'></e-column>
                    <e-column field='CustomerID' headerText='Customer ID' width='120' textAlign="right" [validationRules]='customeridrules'></e-column>
                    <e-column field='Freight' headerText='Freight' width='120' format='C2' textAlign="right" editType='numericedit'></e-column>
                    <e-column field='ShipName' headerText='Ship Name' width='170'></e-column>
                    <e-column field='ShipCountry' headerText='Ship Country' width='150'></e-column>
                </e-columns>
              </ej-grid>`,
    styleUrls: ['app/app.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, EditService, PageService]
})
export class AppComponent implements OnInit {

    @ViewChild('grid')
    public grid: GridComponent;

    public data: any;
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public pageSettings: Object;
    public editparams: Object;
    public modifiedData: {edited: Object[], deleted: Object[], added: Object[] } = {edited: [], deleted: [], added:[]};

    public ngOnInit(): void {
        this.data = gridData1;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.toolbar = ['add', 'edit', 'delete', 'update', 'cancel'];
        this.orderidrules = { required: true };
        this.customeridrules = { required: true };
        this.pageSettings = { pageCount: 5};
    }
    actionComplete(args) {
        console.log(args.requestType + '--' + args.action );
        switch (args.requestType){
           case 'save':
                if(args.action === 'add' && args.data){
                    this.modifiedData.added.push(args.data);
                } else {
                    this.modifiedData.edited.push(args.data);
                }
           break;
           case 'delete':
              this.modifiedData.deleted.push(...args.data);
           break;
        }
  }
}
