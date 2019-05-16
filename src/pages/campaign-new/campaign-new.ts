import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HospitalService } from '../../services/hospital.service';
import { AuthService } from '../../services/auth.service';
import { Campaign } from '../../interfaces/campaign';
import { CampaignService } from '../../services/campaign.service';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';


@IonicPage()
@Component({
  selector: 'page-campaign-new',
  templateUrl: 'campaign-new.html',
})
export class CampaignNewPage {

	campana: FormGroup;
  hospitals: any[];
  hospital_name:string;
  hospital_fk:string;
  formLoad:boolean=false;
  user: string;
  status:string='';
  campananavp: Campaign;
  hospitalselect:string='';


  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public campaignService: CampaignService,
              public hospitalService: HospitalService,
              public authService: AuthService) {
  }

  ionViewDidLoad(){

    this.status = this.navParams.get('status');
    if (this.status == 'editing'){

      this.campananavp = this.navParams.get('campaign');
      this.hospital_name = this.campananavp.hospital_name;
      this.hospital_fk = this.campananavp.hospital_fk;
    }else{
      // creating
    }

    // create form
    this.createMyForm();

    // call hospitales
    // call user

    this.hospitalService.getHospitals().subscribe({
      next: hospital=>{

        this.hospitals = hospital;

      },
      error: err=>{
        console.log(err);

      }
   });
   this.authService.getStatus().subscribe(auth=>{
     this.user= auth.uid;
     this.formLoad = true;
   })

  }
  ionViewWillEnter(){
    // 2
  //  this.createMyForm();
  }



  private createMyForm(){

    if (this.status == 'editing'){

      this.campana = this.formBuilder.group({

        patient: [this.campananavp.patient, Validators.required],
        sex:[ this.campananavp.sex,[Validators.required]],
        type_of_donation: [this.campananavp.type_of_donation, Validators.required],
        bloode_type: [this.campananavp.bloode_type, Validators.required],
        age: [this.campananavp.age, Validators.required],
        number_of_donors: [this.campananavp.number_of_donors, Validators.required],
        city: [this.campananavp.city, Validators.required],
        comment: [this.campananavp.comment, Validators.required],
        hospital_fk: [this.campananavp.hospital_fk, Validators.required],
        hospital_name: [''],
        user_fk: [''],
        date:[''],
        donor_received:[''],

      });
      this.hospitalselect = this.campananavp.hospital_fk;

    }else{
      this.campana = this.formBuilder.group({

        patient: ['', Validators.required],
        sex:['M',[Validators.required]],
        type_of_donation: ['', Validators.required],
        bloode_type: ['', Validators.required],
        age: ['', Validators.required],
        number_of_donors: ['', Validators.required],
        city: ['', Validators.required],
        comment: ['', Validators.required],
        hospital_fk: ['', Validators.required],
        hospital_name: [''],
        user_fk: [''],
        date:[''],
        donor_received:[''],

      });

    }
  }



      sendForn() {

        this.campana.value.user_fk= this.user;
        this.campana.value.hospital_fk= this.hospital_fk;
        this.campana.value.hospital_name= this.hospital_name;
        this.campana.value.date= Date.now().toString();
        this.campana.value.donor_received = 0;


        let camp: Campaign;
        camp = this.campana.value;
        // save data
        if (this.status == 'editing'){

          this.campaignService.updateCampaign(camp, this.campananavp.id).then((success)=>{
            console.log(success);
            console.log('edicion exitosa');
            this.navCtrl.getPrevious().data.campana =camp;
            this.navCtrl.pop();
          })
          .catch((error)=>{
            console.log(error);
        });
        }else{

          this.campaignService.addCampaign(camp).then((success)=>{
              console.log(success.id);
              console.log('Nuevo exitosa');
              // ir a campaign detaill
              this.navCtrl.setRoot("CampaignDetailPage", {campaign_id: success.id});
            })
            .catch((error)=>{
              console.log(error);
          });
        }


      }

      changeSelectHospital(data){

        const result = this.hospitals.find(item => item.id === data);

        this.hospital_name = result.name;
        this.hospital_fk = result.id;
      }



}


// change edit
