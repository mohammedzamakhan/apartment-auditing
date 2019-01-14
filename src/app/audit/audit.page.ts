import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IAppointment } from '../appointment.model';

const getRadioField = (id, key: string): FormlyFieldConfig[] => {
  const label = key[0].toUpperCase() + key.slice(1);
  return [{
    key: `units.${id}.${key}`,
    type: 'radio',
    templateOptions: {
      required: true,
      label,
      options: [{
        value: 'good', label: 'In Good Condition'
      }, {
        value: 'bad', label: 'In Bad Condition'
      }]
    }
  }, {
    key: `units.${id}.${key}Reason`,
    type: 'textarea',
    hideExpression: `model.units[${id}].${key} !== 'bad'`,
    templateOptions: {
      required: true,
      label: 'Reason',
      placeholder: `Reason for bad condition of ${label}`
    }
  }];
};

const getTextAreaField = (key: string): FormlyFieldConfig => {
  const prop = key.split('.')[2];
  return {
    key,
    type: 'textarea',
    templateOptions: {
      label: prop[0].toUpperCase() + prop.slice(1),
    }
  };
};

const getRoomFields = (id: number): FormlyFieldConfig[] => {
  return [
    {
      template: '<h1>Room</h1>'
    },
    ...getRadioField(id, `lights`),
    ...getRadioField(id, `blinds`),
    ...getRadioField(id, `paint`),
    ...getRadioField(id, `carpet`),
    ...getRadioField(id, `door`),
    ...getRadioField(id, `alarm`),
  ];
};

const getBathFields = (id: number): FormlyFieldConfig[] => {
  return [
    {
      template: '<h1>Bath</h1>'
    },
    ...getRadioField(id, `lights`),
    ...getRadioField(id, `paint`),
    ...getRadioField(id, `floor`),
    ...getRadioField(id, `door`),
    ...getRadioField(id, `knobs`),
  ];
};
@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
})
export class AuditPage implements OnInit {
  form = new FormGroup({});

  model: any;

  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    ...getRoomFields(0),
    ...getRoomFields(1),
    ...getBathFields(2),
  ];
  itemRef: AngularFireObject<IAppointment>;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private location: Location) {
    const params = this.route.snapshot.params;
    this.itemRef = this.db.object<IAppointment>(`/appointments/${params.key}`);
    this.itemRef.valueChanges().subscribe(appointment => {
      this.model = appointment;
    });
  }

  ngOnInit() {
  }

  submit() {
    this.itemRef.update({
      ...this.model,
      status: this.form.invalid ? 'incomplete' : 'complete',
    });
    this.location.back();
  }

}
