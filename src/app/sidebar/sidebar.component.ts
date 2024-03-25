import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { CrudService } from '../shared/services/crud.service';
declare var $: any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    id: string;
    array: Nav[];
    subclass: string;
}

interface Nav {
    path: string;
    title: string;
    id: string;
    class: string;
}



export const USERROUTES: RouteInfo[] = [
    { path: '/analytics', subclass: '', title: 'Analytics', icon: 'solana.svg', class: 'active', id: 'analytics', array: [] },
    { path: '/output-indicators', subclass: '', title: 'Output Indicators', icon: 'tree.svg', id: "ioip", class: "", array: [] },
    { path: '/intermediate-output-indicators', subclass: '', title: 'Intermediate Outcome Indicator', icon: 'tree.svg', id: "ioi", class: "", array: [] },
    { path: '/beneficiaries', subclass: '', title: 'Beneficiaries', icon: 'receipt.svg', class: '', id: 'beneficiaries', array: [] },
    { path: '/cross-cutting-issues', subclass: '', title: 'Cross-Cutting Issues', icon: 'tree.svg', class: 'tree', id: '', array: [] },
    { path: '/output-management', title: 'Indicator Management', id: "log1", subclass: '', icon: 'receipt.svg', class: '', array: [] },
    { path: '/activities', subclass: '', title: 'Agile Activities', icon: 'receipt.svg', class: '', id: 'act', array: [] },
    { path: '/gis', subclass: '', title: 'GIS Page', icon: 'map.svg', class: '', id: 'del', array: [] },
    { path: '/settings', subclass: '', title: 'Settings', icon: 'settings.svg', class: '', id: 'settings', array: [] },
    
];

export const ROUTES: RouteInfo[] = [
    { path: '/analytics', subclass: '', title: 'Analytics', icon: 'solana.svg', class: 'active', id: 'analytics', array: [] },
    { path: '/intermediate-output-indicators', subclass: '', title: 'Intermediate Outcome Indicator', icon: 'tree.svg', id: "ioi", class: "", array: [] },
    { path: '/output-indicators', subclass: '', title: 'Output Indicators', icon: 'tree.svg', id: "ioip", class: "", array: [] },
    { path: null, subclass: "nc-icon nc-minimal-down", title: 'Agile Activities', icon: 'receipt.svg', class: 'active', id: 'act', array: [] },
    { path: 'project-categories', subclass: "", title: 'Activity Categories', icon: 'receipt.svg', class: '', id: 'procat', array: [] },
    { path: '/beneficiaries', subclass: '', title: 'Beneficiaries', icon: 'receipt.svg', class: '', id: 'beneficiaries', array: [] },
    { path: '/cross-cutting-issues', subclass: '', title: 'Cross-Cutting Issues', icon: 'tree.svg', class: 'tree', id: '', array: [] },
    { path: '/gis', subclass: '', title: 'GIS Page', icon: 'map.svg', class: '', id: 'del', array: [] },
    { path: '/output-management', subclass: '', title: 'Indicator Management', icon: 'tree.svg', id: "log1", class: "active", array: [] },
    { path: '/result-framework', subclass: '', title: 'Result Framework', icon: 'tree.svg', class: 'tree', id: '', array: [] },
    { path: '/third-party', subclass: '', title: 'Third Party', icon: 'map.svg', class: '', id: 'thirdParty', array: [] },
    { path: '/settings', subclass: '', title: 'Settings', icon: 'settings.svg', class: '', id: 'settings', array: [] },
    
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    user;
    categories: any = [
        'Infrastructure',
        'Education',
        'Others',
    ];
    subs: any;
    subsArr: { path: string; title: any; id: string; class: string; }[];
    constructor(private toastr: ToastrService, private crud: CrudService, private spinner: NgxSpinnerService) {
        this.user = JSON.parse(sessionStorage.getItem("user"));
    }
    ngOnInit() {
        this.getSubComponent()
        this.getCategories();
    }
    addActive(data) {
        $('.sidebar-wrapper li').removeClass('active')
        data.currentTarget.setAttribute("class", "active");
    }
    addAct(data) {
        if (data.id != 'act') {
            $('.sidebar-wrapper li').removeClass('active')
            data.parentElement.setAttribute("class", "active");
        }
    }

    onSubmit(data: NgModel) {
        this.spinner.show()
        this.crud.postAuthData('categories', data.value).subscribe(
            (res: any) => {
                this.spinner.hide()
                this.getCategories();
            },
            (error) => {
                this.spinner.hide()
            }
        )
    }

    getCategories() {
        this.crud.getAuthData('categories').subscribe(
            (res: any) => {
                this.categories = res?.payload;
            }
        )
    }

    getSubComponent() {
        this.crud.getAuthData('sub-components').pipe(first()).subscribe(
            (res: any) => {
                this.subs = res?.payload;
                const arr = Array.from(this.subs, ((e: any) => {
                    return { path: `/activities/${e.id}`, title: e.title, id: `sub${e.id}`, class: "active" }
                }))

                if (this.user.roles[0].name == 'admin' || this.user.roles[0].name == 'npcu') {
                    this.menuItems = ROUTES.filter(menuItem => menuItem);
                } else {
                    this.menuItems = USERROUTES.filter(menuItem => menuItem);
                }
                this.menuItems.find(e => e.id == 'act').array = arr;
                $(document).ready(function () {
                    $('#act').on('click', () => {
                        $('#act').children('.collapse').toggleClass('show');
                        $('#act').children('.nc-icon').toggleClass('nc-minimal-up')
                    })
                });


            }
        )
    }
}
