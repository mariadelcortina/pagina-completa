const timeout = (delay) => new Promise((res) => setTimeout(res, delay));

window.addEventListener('DOMContentLoaded', () => {
  // Example 1:
  // Travel to...
  const planeMachineElement = document.querySelector('#planeMachine');
  const planeMachine = new SlotMachine(planeMachineElement, {
    active: 1,
    delay: 450,
    randomize() {
      return this.nextIndex;
    },
  });

  (async function runPlaneMachine() {
    await planeMachine.shuffle(5)
    await timeout(1000);
    runPlaneMachine();
  })();

  // Example 2:
  // Randomize
  const randomizeButton = document.querySelector('#randomizeButton');
  const slotMachineResults = [
    document.querySelector('#machine0Result'),
    document.querySelector('#machine1Result'),
    document.querySelector('#machine2Result'),
  ];
  const slotMachineContainers = [
    document.querySelector('#machine0'),
    document.querySelector('#machine1'),
    document.querySelector('#machine2'),
  ];
  const slotMachines = slotMachineContainers.map(
    (element, index) => new SlotMachine(element, { active: index }),
  );

  function onComplete() {
    const index = this.element.id.replace(/[a-z]/g, '');

    slotMachineResults[index].innerText = `Index: ${this.active}`;
  }

  randomizeButton.addEventListener('click', () => {
    slotMachines[0].shuffle(5, onComplete);
    setTimeout(() => slotMachines[1].shuffle(5, onComplete), 500);
    setTimeout(() => slotMachines[2].shuffle(5, onComplete), 1000);
  });

  // Example 3:
  // Watch
  const direction = 'down';
  const watchSwitchButton = document.querySelector('#watchBtnSwitch');
  const watchNextButton = document.querySelector('#watchBtnNext');
  const watchPrevButton = document.querySelector('#watchBtnPrev');
  const watchElement = document.querySelector('#watchContainer');
  const watch = new SlotMachine(watchElement, {
    direction,
  });

  watchSwitchButton.addEventListener('click', () => watch.setOptions({
    direction: watch.options.direction === 'up' ? 'down' : 'up'
  }));
  watchPrevButton.addEventListener('click', () => watch.prev());
  watchNextButton.addEventListener('click', () => watch.next());

  // Example 4:
  // Triky
  const trikyButton = document.querySelector('#trikyShuffle');
  const trikyElement = document.querySelector('#triky1');
  const triky = new SlotMachine(trikyElement, {
    randomize() {
      return 0;
    },
  });

  trikyButton.addEventListener('click', () => triky.shuffle(5));

  // Example 5:
  // Slot Machine
  let count = 0;
  const shuffleButton = document.querySelector('#casinoShuffle');
  const stopButton = document.querySelector('#casinoStop');
  const casino1Element = document.querySelector('#casino1');
  const casino2Element = document.querySelector('#casino2');
  const casino3Element = document.querySelector('#casino3');
  const casino1 = new SlotMachine(casino1Element, {
    active: 0,
    delay: 500,
    direction: 'up'
  });
  const casino2 = new SlotMachine(casino2Element, {
    active: 1,
    delay: 500,
  });
  const casino3 = new SlotMachine(casino3Element, {
    active: 2,
    delay: 500,
    direction: 'up'
  });

  shuffleButton.addEventListener('click', () => {
    count = 3;
    casino1.shuffle(Infinity);
    casino2.shuffle(Infinity);
    casino3.shuffle(Infinity);
  });

  stopButton.addEventListener('click', () => {
    switch (count) {
      case 3:
        casino1.stop(2);
        break;
      case 2:
        casino2.stop(3);
        break;
      case 1:
        casino3.stop(4);
        break;
    }
    count--;
  });

  // Footer
  const footerElement = document.querySelector('#textMachine');
  const footer = new SlotMachine(footerElement, {
    active: 1,
    delay: 450,
    auto: 1500,
    randomize() {
      return this.nextIndex;
    },
  });

  (async function runFooter() {
    await footer.shuffle(5)
    await timeout(1000);
    runFooter();
  })();
});

















const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener('click', () => {
	fila.scrollLeft += fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.nextSibling){
		indicadorActivo.nextSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener('click', () => {
	fila.scrollLeft -= fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.previousSibling){
		indicadorActivo.previousSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Paginacion ----- -----
const numeroPaginas = Math.ceil(peliculas.length / 5);
for(let i = 0; i < numeroPaginas; i++){
	const indicador = document.createElement('button');

	if(i === 0){
		indicador.classList.add('activo');
	}

	document.querySelector('.indicadores').appendChild(indicador);
	indicador.addEventListener('click', (e) => {
		fila.scrollLeft = i * fila.offsetWidth;

		document.querySelector('.indicadores .activo').classList.remove('activo');
		e.target.classList.add('activo');
	});
}

// ? ----- ----- Hover ----- -----
peliculas.forEach((pelicula) => {
	pelicula.addEventListener('mouseenter', (e) => {
		const elemento = e.currentTarget;
		setTimeout(() => {
			peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
			elemento.classList.add('hover');
		}, 300);
	});
});

fila.addEventListener('mouseleave', () => {
	peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});
