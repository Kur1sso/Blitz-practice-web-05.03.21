const menuBtn = document.querySelector('.menu__burger-inner');
const menu = document.querySelector('.menu__container');
const burger = document.querySelector('.menu__burger')
const nav = document.querySelector('.menu');


menuBtn.addEventListener('click',menuToggle);

document.body.addEventListener('click', event =>{
	if(~event.target.classList.item(0).indexOf('menu')){
		return;
	}
	if(!menu.classList.contains('menu-open')){
		return;
	}
	burger.classList.remove('menu__burger-open');
	menuRemove();
})


function menuToggle() {
	burger.classList.toggle('menu__burger-open');
	if (menu.classList.contains('menu-open')) {
		menuRemove();
	} else {
		menuOpen();
	}
}
function menuRemove() {
	menu.classList.remove('menu-open');
		setTimeout(() =>{
			menu.style.display = 'none';
			},
		500);
}

function menuOpen(){
	menu.style.display = 'block';
		setTimeout(() =>{
			menu.classList.add('menu-open');
		},
		1)
}



const btns = document.querySelectorAll('.catalog__btn');
btns.forEach( btn => { 
	btn.addEventListener('click', filter);
}) 

function filter(btn) {
	const priceMin = btn.target.getAttribute('min-price')* 1000000;
	let priceMax = btn.target.getAttribute('max-price')* 1000000;
	btns.forEach(btn =>{
		btn.classList.remove('catalog__btn-active');
	})
	btn.target.classList.add('catalog__btn-active');
	const items = document.querySelectorAll('.catalog__item');


	items.forEach( elem =>{
		elem.classList.remove('deleted');
		if(priceMin == 0){
			return;
		} 


		const price = elem.getAttribute('price');
		if(priceMin<price && (price<priceMax || priceMax ==0) ){
			return;
		} else {
			elem.classList.add('deleted');
		}
	})
}


const btnCatalog = document.querySelector('.catalog__bottom-btn')

btnCatalog.addEventListener('click', openCatalog);
const catalogList = document.querySelector('.catalog__list');
function openCatalog() {
	catalogList.style.maxHeight = catalogList.offsetHeight + 606*2 +'px';
}




const radioQuestion = document.querySelectorAll('.slider__radio');
const sliderNum = document.querySelector('.slider__number');
const answersArr = new Array(5);


radioQuestion.forEach(radio => {
	radio.addEventListener('change', event => { 
		getAnswer(event.target.id);
	});
})


function countAnswers(id) {
	answersArr[id] = 1;
	let count = answersArr.reduce((sum, current) => sum + current, 0);
	sliderNum.textContent = count;
}


function getAnswer(id) {
	let wrongLabel;
	let labels = document.querySelectorAll('.slider__answer');
	labels.forEach(item => {
		let question = item.getAttribute('for')
		if(question[1] !== id[1]){
			return;
		}
		item.classList.remove('slider__answer-checked');
	})

	let label = document.querySelector(`[for=q${id[1]}-${id[id.length - 1]}]`);
	label.classList.add('slider__answer-checked');
	countAnswers(id[1]);
}
