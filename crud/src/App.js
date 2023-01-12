
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, FormGroup, ModalFooter, ModalHeader} from 'reactstrap'


import React from 'react';
const data =[{id:1, nombre:"juan", ocupacion:"empleado"},{id:2, nombre:"juan", ocupacion:"empleado"},
{id:3, nombre:"Pedro", ocupacion:"Moderador"},{id:4, nombre:"Mario", ocupacion:"Jefe"}];


class App extends React.Component{

//Region of manage our states and the our data

  state={
    error:'',
    opcion:'',
    data: data,
  
    form:{
      id:'',nombre:'',ocupacion:''
    },
  insertModal:false,
  };


  //End Region data
 
 
 //Funtion for manage our form
  handleChange=e=>{
this.setState({
form:{
  ...this.state.form, [e.target.name]: e.target.value,
}

})

  }

  //End function data in this case whe made a copy off our obj and then we play with our name attribute

  //Logic of show our modal or close or modal
  showModal=()=>{
 
    const insertData ={...this.state.form};

    insertData.id=this.state.data.length+1;
    insertData.nombre='';
    insertData.ocupacion='';


    this.setState({opcion:"Agregar",insertModal:true, form:insertData})    
  }

  closeModal=()=>{
  
    this.setState({insertModal:false})
  
  }

  showModalEdit=(empleado)=>{
  
 
  this.setState({opcion:"Editar", insertModal:true, form:empleado})    

  }

  closeModalEdit=()=>{
  

  this.setState({insertModal:false})
  
  
  }

//end off modal function the most important thing here is play with the data that recibece our objs
 

//function delete 
  delete=(DeleteEmploy)=>{

var opcion=window.confirm("Do you really want to delete this register "+DeleteEmploy.id); // this is like a alert

if(opcion){

  let employees = this.state.data;
  var count=0;
  employees.map((employ)=>{
 
  if(employ.id===DeleteEmploy.id){
 
   employees.splice(count,1);
 
  }
 count++;
 return true;
  })
 this.setState({data:employees});
 

}


  }

// function save that recieve different parameters in order to choose what  function is going to work
// can be edit or insrt
  guardar=()=>{

    if(this.state.form.nombre!=='' && this.state.form.ocupacion!==''){

    

    if(this.state.opcion==="Agregar"){

      const newData ={...this.state.form};

      newData.id=this.state.data.length+1;
      
      var lista = this.state.data;
    
      lista.push(newData);
    
      this.setState({data:lista, insertModal:false}); 


    }else if (this.state.opcion==="Editar"){

      let empleados = this.state.data;
      var i=0;
      empleados.map((empleado)=>{
        
        if(empleado.id===this.state.form.id){
  
          empleados[i].nombre = this.state.form.nombre;
          empleados[i].ocupacion = this.state.form.ocupacion;


        }
        i++;

        return true;      
      })

this.setState({data:empleados, insertModal:false,error:''});
    }

    }else{
         this.setState({error:'Please fill all the fields'})
    }
  }

render(){   
  return (
 <>
 <Container>
<br></br>


 
    <Table className="table-dark" striped bordered hover >
    <thead>
    <tr className='text-center'>
    <th colSpan={12}>


      Empleados


    </th>  
    </tr>      
    </thead>                                            
      <tbody>
       <tr>
<td>
ID
</td>

<td>
nombre
</td>
<td>
ocupacion
</td>

<td>
  opciones
</td>
       </tr>

{this.state.data.map((elemento,i)=>
<tr key={i}>

<td>
{elemento.id}
</td>

<td >
  {elemento.nombre}
</td>

<td>

{elemento.ocupacion}
</td>

<td id='botonesCol'>
<Button id='btnTable' onClick={()=>this.showModalEdit(elemento)} color='primary'>Editar</Button>
<Button id='btnTable' onClick={()=>this.delete(elemento)} color='danger'>Eliminar</Button>
</td>

</tr>
)}

      </tbody>
    </Table>

    <Button onClick={()=>this.showModal()} color='primary'>Insertar nuevo empleado</Button>
    </Container>

    <Modal isOpen={this.state.insertModal}>

<ModalHeader>

<div>
  <h3>{this.state.opcion} Empleado</h3>
</div>


</ModalHeader>

<ModalBody>

<FormGroup>

<label>Id:</label>

<input className='form-control' readOnly type="text" value={this.state.form.id}></input>

</FormGroup>

<FormGroup>

<label>
Empleado  
</label>

<input value={this.state.form.nombre} className='form-control' name='nombre' type='text' onChange={this.handleChange}></input>

</FormGroup>

<FormGroup>

<label>
Ocupacion
</label>

<input className='form-control' value={this.state.form.ocupacion} name='ocupacion' type="text" onChange={this.handleChange}></input>
<p></p>

</FormGroup>


<p id='error'> {this.state.error}</p>
</ModalBody>

<ModalFooter>

<Button color='primary' onClick={()=>this.guardar()}>Guardar</Button>
<Button color='danger' onClick={()=>this.closeModal()}>Cancelar</Button>

</ModalFooter>
  </Modal>

    </>
      )}
}

export default App;
