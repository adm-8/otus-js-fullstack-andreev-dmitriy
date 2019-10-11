var getPath = (el) => {

	let qs = null;
	let csssel = '';
	let ElId = el.getAttribute('id');
	let ElClass = el.getAttribute('class');
	let isUnique = false;

	// функция проверки селектора на уникальность
	let checkSelector = (sel, block) => {
		qs = document.querySelectorAll(sel);
		if(qs.length == 1){
			console.log(`Found by ${block}...`);
			isUnique = true;
			return isUnique;
		}	
	}

	// функция для получения :nth-child()
	let addNthChild = (el, curSel) => {
		let childNum = 0;
		let prevEl = el;
		if(prevEl){
			do{
				prevEl = prevEl.previousElementSibling;
				childNum++;
			}
			while(prevEl);

			return `${curSel}:nth-child(${childNum})`;
		}else{
			return curSel;
		}
	}

	// функция для получения всей цепочки родителей до body 
	let addParentsAndNth = (el, curSel) => {
		let parEl = el.parentElement;
		let tempSel = '';
		do{
			// формируем селектор по родительскому тегу + его :nth-child()
			let sel = addNthChild(parEl, parEl.tagName);
			tempSel = `${sel} ${tempSel}`;
			parEl = parEl.parentElement;

		}while(parEl.tagName != 'BODY');
		
		return `body ${tempSel} ${curSel}`;
	}

	try{

		// проверяем селектор по айдишнику
		if(ElId){
			csssel = `#${ElId}`;
			if(checkSelector(csssel, 'Id'))
				return csssel;
		}

		// проверяем селектор по айдишнику + классам 
		if(ElClass){
			let sel = ElClass.replace(' ', '.');
			csssel = `${csssel}.${sel}`;
			if(checkSelector(csssel, 'Id + Class'))
				return csssel;

		}

		// проверяем селектор по айдишнику + классам + :nth-child() переданного элемента
		csssel = addNthChild(el, csssel);
			if(checkSelector(csssel, 'Id + Class + nth-child'))
				return csssel;


		// прогоняем всю цепочку до BODY с формированием nth-child() для каждой ноды в цепочке
		csssel = addParentsAndNth(el, csssel);
			if(checkSelector(csssel, 'Id + Class + parents nth-child'))
				return csssel;


	}catch(e){

		return new Error(`Error while searching unique css selector: ${e}`);

	}

	/* Надо ли руками обнулять значения переменных или этим потом обяательно займётся сборщик мусора?

	finally{
		qs 			= null;
		csssel 		= null;
		ElId 		= null;
		ElClass 	= null;
		isUnique 	= null;
	}

	*/

} 