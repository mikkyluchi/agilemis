import { Component, OnInit, Input } from "@angular/core";
import { CrudService } from "src/app/shared/services/crud.service";

@Component({
  moduleId: module.id,
  selector: "deliverable",
  templateUrl: "deliverable.component.html",
  styleUrls: ["./deliverable.component.css"],
})
export class DeliverableComponent implements OnInit {

  projectSwitch
  thirdPartySwitch
  sbmcSwitch
  cbmcSwitch
  mapData: any;
  constructor(private crud: CrudService) {}

  ngOnInit() {
    this.getGis()
  }

  getGis(){
    this.crud.getAuthData('gis').subscribe(
      (res: any)=>{
        this.mapData = res.payload;
      }
    )
  }
}
