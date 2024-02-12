import { Component, ViewChild } from "@angular/core";
import { SqliteService } from '../services/sqlite.service';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle} from "ng-apexcharts";
import { FormGroup, FormControl,  FormBuilder} from '@angular/forms';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],

})

export class Page1Component{
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  form: FormGroup | any;
  

  createForm(){
    this.form = new FormGroup({
      cant_lecturas: new FormControl(""),
    })
  }

  public lectura: number=0;
  public languages: string[];
  public numericos: number[]=[0];
  public numerico: number;
  public fecha: number = 0;
  public minimo: number[]=[];
  public maximo: number[]=[30];
  public valor: number[]=[];
  public cadena: string = "";
  public abajo: string = "";
  public abajo1: string[] = [];
  public cant_lecturas: number = 10;
  public total_lecturas: number = 0;
  public load: boolean = false;

  constructor(private sqlite: SqliteService) {
    //constructor() {
     
  }

  ngOnInit():void {
   // this.grafico();
    this.createForm();
    this.buscar_datos();
   

}

  buscar_datos(){
    this.sqlite.read().then((languages: string[]) => {
      this.total_lecturas = languages.length;
        for (let index = 0; index < this.cant_lecturas; index++) {
          this.cadena = languages[index].slice(0, languages[index].indexOf("-")-1);
          var y: number = +this.cadena;
          this.numericos[index] = y;
          this.minimo[index] = 4.5;
          this.maximo[index] = 5.5;
          this.cadena = languages[index].slice(languages[index].indexOf("-")+2, languages[index].indexOf("/"));
          this.abajo1[index] = this.cadena; 
        }
        this.load = true;
          this.grafico();
  
       }).catch(err => {
        console.error(err);
        console.error("Error al leer"); 
      })
 
  }

 cambiar_cant_lecturas(){
  
  if (this.form.controls.cant_lecturas.value>this.total_lecturas){
     this.cant_lecturas = this.total_lecturas;
  }else{
  this.cant_lecturas= this.form.controls.cant_lecturas.value;
  }
  if (this.cant_lecturas<2){return}
  this.numericos = [];
  this.minimo = [];
  this.maximo = [];
  this.abajo1 = [];
    this.buscar_datos();
 }

  grafico() {
    this.chartOptions = {
      series: [
        {
          name: "Lectura",
          data: this.numericos,
        },
        {
          name: "Min",
          data: this.minimo,
        },       
        {
          name: "Max",
          data: this.maximo,
        },
      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Lecturas Glicemia ("+ this.cant_lecturas +")"
      },
      xaxis: {
        categories: this.abajo1
      }
    };    
  }

  
   

  
}

