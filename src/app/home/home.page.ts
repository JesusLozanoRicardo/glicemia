import { Component } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  form: FormGroup | any;
  
  typesOf: any[] = [{id: 0, title: 'De mg/dL a mmol/L', unidad: 'mmol/L', checked: 'true'}, {id: 1, title: 'De mmol/L a mg/dL', unidad: 'mg/dL',checked: 'false'}];
  resultado : number = 0;
  public languages: string[];
  public fechas: string[];
  public fecha: number = 0;
  public unidad:string = "mmol/L";
  public cadena:string = "";
  //public unidad:string = "mg/dL";
  public algo:string = "";
  public fecha_normal: string[]=[];
  public fecha_numero: string[]=[];
  

  createForm(){
    this.form = new FormGroup({
      unidad: new FormControl(""),
      lectura: new FormControl(""),
      oculto: new FormControl(""),
      test: new FormControl(""),
      unidad_form: new FormControl(""),
      newUserName: new FormControl(""),
   //   resultado: new FormControl("0"),
    })
  }

  //public lectura: number=0;
  


  constructor(formBuilder: FormBuilder,private sqlite: SqliteService,private router: Router) {
    //this.language = '';
    this.fecha = 0;
    this.languages = [];
    this.fechas = [];

  }

  ngOnInit():void {
    this.createForm();
    //this.read();
}

prueba(algo: string){
 alert(algo);
}

calcular(){
  
  if (this.form.controls.unidad.value=="mmol/L"){
     this.unidad = "mmol/L";
     this.resultado = Number(this.form.controls.lectura.value) / 18;
     this.resultado = Number(this.resultado.toFixed(2));
  }else{
     this.unidad = "mg/dL";
     this.resultado = Number(this.form.controls.lectura.value) * 18;
     this.resultado = Number(this.resultado.toFixed(2));
  }
  
}

  ir(){
    this.router.navigate(['/page1']);
  }

  // Al entrar, leemos la base de datos
  ionViewWillEnter(){
    this.read();
  }

  create(){

     if (this.resultado==0){
      return
     }
  
      this.sqlite.create(this.resultado,this.fecha).then((changes) =>{
      this.resultado = 0;
      alert("Guardado ...");
      this.read(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al crear");
    })
    
  }

  read(){
    
    // Leemos los datos de la base de datos
    this.sqlite.read().then((languages: string[]) => {
      for (let index = 0; index < languages.length; index++) {
        this.cadena = languages[index].slice(0, languages[index].indexOf("*"));
        this.languages.push(this.cadena);  
        this.cadena = languages[index].slice(languages[index].indexOf("*")+2);
        this.fecha_numero.push(this.cadena);
      }
      //console.log("Leido");
      //console.log(this.languages);
    }).catch(err => {
      console.error(err);
      console.error("Error al leer");
    })
  }
  
  update(fecha: string){
    if (this.resultado==0){
      alert("introduzca el valor que desea editar");
      return
     }
    // Actualizamos el elemento (language) por el nuevo elemento (this.language)
    this.sqlite.update(this.resultado,fecha).then( (changes) => {
      
      console.log(changes);
      console.log("Actualizado");
      this.resultado = 0;
      this.languages = [];
     this.read(); // Volvemos a leer
    }).catch(err => {
      console.error(err);
      console.error("Error al actualizar");
    })
    this.read();
  }

  delete(fecha: string){
       // Borramos el elemento
       var resultado = window.confirm('Estas seguro?');
         if (resultado === true) {
          this.sqlite.delete(fecha).then( (changes) => {
            //console.log(changes);
            //console.log("Borrado");
            this.languages = [];
            this.read(); // Volvemos a leer
          }).catch(err => {
            console.error(err);
            console.error("Error al borrar");
          })
          
         } 

  }

}
