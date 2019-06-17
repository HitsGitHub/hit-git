import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { JsonServiceService } from 'src/app/json-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  submitted = false;
  mul_city = [];
  filteredStates: any[];
  filteredCity: any[];
  storeCities: any = [];
  countries = [];
  cities = [];
  limitSelection = false;
  dropdownSettings: any = {};
  dropdownSettings1: any = {};
  closeDropdownSelection = false;
  constructor(private formBuilder: FormBuilder,
    private JSon: JsonServiceService, private http: HttpClient) {
    this.JSon.getJsonData().subscribe(data => {
      console.log("data", data);
      this.countries = data;
      this.dropdownSettings1 = {
        singleSelection: true,
        idField: 'countryName',
        textField: 'countryName',
        closeDropDownOnSelection: true
      };
      for (let country of this.countries) {
        this.cities.push(country.cities);
      }
      console.log("this.cities", this.cities);
    })
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      country: [],
      state: [],
      chkbox: new FormArray([]),

    })
    this.addchkbox();
  }
  onSelectCountry(cuntry) {
    this.filteredStates = this.countries.find(con => con.countryName == cuntry).cities;
    console.log("this.filteredStates", this.filteredStates);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      enableCheckAll: false,
    };
  }
  deselectCountry(deselectCountry) {
    console.log("DeselectCountry", deselectCountry);
    this.filteredCity.splice(0);
  }
  onStateSelect(state) {
    this.mul_city.push(state.name);
    console.log("Mul_city", this.mul_city);

    for (var j = 0; j <= this.mul_city.length; j++) {
      this.filteredCity = this.filteredStates.find(con => con.name[j] === state.name[j]).values;
    }
    console.log("filtered City", this.filteredCity);
    this.storeCities.push(this.filteredCity);
    console.log("storesCity", this.storeCities);
  }
  onStateDeSelect(deSelectState) {
    console.log(deSelectState);
    this.filteredCity.splice(0);
  }

  private addchkbox() {
    this.filteredCity.map((o, i) => {
      const control = new FormControl(i == 0); // if first item set to true, else false
      (this.myForm.controls.chkbox as FormArray).push(control);
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log("submitted");
    console.log("this.myForm.value", this.myForm.value);

    this.filteredCity.map((o, i) => {
      const control = new FormControl(i === 0);  // if first item set to true, else false
      (this.myForm.controls.chkbox as FormArray).push(control);
    });
    const selectedOrderIds = this.myForm.value.chkbox.map((v, i) => v ? this.filteredCity[i].name : this.filteredCity[i].name).filter(v => v !== null);
    console.log("selectedCheckboxOrderIDs", selectedOrderIds);
    (this.myForm.controls.chkbox as FormArray).setValue(selectedOrderIds);
    localStorage.setItem('Form_Data', JSON.stringify(this.myForm.value));
    this.myForm.reset();
  }
  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.dropdownSettings1 = Object.assign({}, this.dropdownSettings1, { closeDropDownOnSelection: this.closeDropdownSelection });
  }
  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
  }
}
