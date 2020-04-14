//variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//funciones

const comprarCurso = (e) =>{

  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')){

    const curso = e.target.parentElement;
    leerDatosCurso(curso);

  }

}

const leerDatosCurso = (curso) =>{

  const infoCurso = {
    imagen: curso.parentElement.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  }  

  insertarCarrito(infoCurso);

}

const insertarCarrito = (curso) =>{

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width="150">
    </td>  
    <td>
      ${curso.titulo}
    </td>
    <td>
      ${curso.precio}
    </td>
    <td>
    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
  </td>
  `;

  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);

}

const eliminarCurso = (e) => {

  e.preventDefault();

  let curso,
      cursoId;

  if (e.target.classList.contains('borrar-curso')){
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector('a').getAttribute('data-id');    
  }

  borrarCursosLocalStorage(cursoId);

}

const vaciarCarrito = (e) => {

  e.preventDefault();  

  // listaCursos.innerHTML = '';

  while(listaCursos.firstChild) {

    listaCursos.removeChild(listaCursos.firstChild);

  } 

  vaciarLocalSorage();
  return false;

}

//localStorage
const localStorageReady = () => {

  let cursos;
  cursos = obtenerCursosLocalStorage();    

  cursos.forEach( (curso) => {

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width="150">
    </td>  
    <td>
      ${curso.titulo}
    </td>
    <td>
      ${curso.precio}
    </td>
    <td>
      <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `;

    listaCursos.appendChild(row);    

  });
  
}

const guardarCursoLocalStorage = (curso) =>{

  let cursos;
  cursos = obtenerCursosLocalStorage();  
  cursos.push(curso);  
  localStorage.setItem('cursos', JSON.stringify(cursos) ); 

}

const borrarCursosLocalStorage = (curso) => {

  let cursos;
  cursos = obtenerCursosLocalStorage();  

  cursos.forEach((cursoLS, i) => {

    if(cursoLS.id === curso){
      cursos.splice(i, 1);
    }

  });

  localStorage.setItem('cursos', JSON.stringify(cursos) ); 
  
}

const vaciarLocalSorage = () =>{
  localStorage.clear();
}

function obtenerCursosLocalStorage(){

  let cursos;

  if (localStorage.getItem('cursos') === null){    
    cursos = [];    
  }else{
    cursos = JSON.parse( localStorage.getItem('cursos') );
  }

  return cursos;

}



//listeners

const listeners = () =>{

  cursos.addEventListener('click', comprarCurso);
  carrito.addEventListener('click', eliminarCurso);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  document.addEventListener('DOMContentLoaded', localStorageReady);

}

listeners();