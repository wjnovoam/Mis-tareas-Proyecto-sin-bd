const d = document;
const $formulario = d.getElementById('datos-formulario');
const $listaTareasUl = d.querySelector('#lista-tareas ul');
let $listaEditar;

let id = 0;

d.addEventListener('DOMContentLoaded', () => {
	validacionFormularios();
	tareas();
});

function validacionFormularios() {
	$formulario.addEventListener('submit', (e) => {
		e.preventDefault();
		const $nombre = d.getElementById('nombre');
		const $descripcion = d.getElementById('descripcion');
		const $btnValue = d.getElementById('btn-form');

		let ExpRNombre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
		let ExpRDescripcion = /^.{1,255}$/;
		console.log($btnValue.value);

		//prettier-ignore
		if($btnValue.value === 'Guardar'){
      if (ExpRNombre.test($nombre.value) && ExpRDescripcion.test($descripcion.value)) {
              const $li = d.createElement('li');
              $listaTareasUl.appendChild($li);
              $li.classList.add('tarea');
              
              $li.innerHTML = `<h2>${$nombre.value}</h2><p>${$descripcion.value}</p>
                  <button class="completa">Completa</button>
                  <button class="actualizar">Actualizar</button>
                  <button class="eliminar">Eliminar</button>`;

              $nombre.value = '';
              $descripcion.value = '';
          }
    }

		if ($btnValue.value === 'Actualizar') {
			if (
				ExpRNombre.test($nombre.value) &&
				ExpRDescripcion.test($descripcion.value)
			) {
				$listaEditar.children[0].textContent = $nombre.value;
				$listaEditar.children[1].textContent = $descripcion.value;

				$formulario.firstElementChild.textContent = 'Agregar tarea';
				$formulario.lastElementChild.value = 'Guardar';

				$nombre.value = '';
				$descripcion.value = '';
			}
		}
	});
}

function tareas() {
	const $listaTareas = d.querySelector('#lista-tareas');

	$listaTareas.addEventListener('click', (e) => {
		if (e.target.matches('.eliminar')) {
			e.target.parentElement.remove();
		}
		if (e.target.matches('.completa')) {
			e.target.parentElement.style.setProperty(
				'background-color',
				'rgba(0,255,0,0.5)'
			);

			let hijos = e.target.parentElement.children;

			e.target.remove();
			hijos[2].remove();
		}

		if (e.target.matches('.actualizar')) {
			const $nombre = d.getElementById('nombre');
			const $descripcion = d.getElementById('descripcion');

			let nombreCambiar = e.target.parentElement.children[0].textContent;
			let descripcionCambiar = e.target.parentElement.children[1].textContent;

			$nombre.value = nombreCambiar;
			$descripcion.value = descripcionCambiar;

			$formulario.firstElementChild.textContent = 'Actualizar tarea';
			$formulario.lastElementChild.value = 'Actualizar';

			$listaEditar = e.target.parentElement;
		}
	});
}
