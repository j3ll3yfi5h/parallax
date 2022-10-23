const whitehouse = document.getElementById('whitehouse');
const biden = document.getElementById('biden');
const washington = document.getElementById('washington');
const presidentsOutput = document.getElementById('presidents');

// parallax
document.addEventListener('scroll', () => {
	let scrollY = (window.scrollY);
	whitehouse.style.setProperty('--move-y-3', scrollY/2 + 'px');
	washington.style.setProperty('--move-y-2', scrollY/4 * -1 + 'px');
	biden.style.setProperty('--move-y-1', scrollY*1.25 * -1 + 'px');
});

// fadein animation
let callback = (entries, observer) => {
	entries.forEach((entry) => {
		if(entry.isIntersecting){
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		}
	})
}

let observer = new IntersectionObserver(callback);

// get data
fetch('data/presidents.json')
	// parse data
	.then((response) => response.json())
	// use data
	.then((data) => {
		for(i = 0; i < data.length; i++){
			// article tag
			let article = document.createElement('article');
			article.classList.add('m-president');

			// h2 tag
			let h2 = document.createElement('h2');
			h2.append(data[i]['president']);
			article.append(h2);

			// div tag
			let div = document.createElement('div');
			let tookOffice = data[i]['took_office'].substring(0,4);
			let leftOffice = data[i]['left_office'];
			if(leftOffice != null){
				leftOffice = ' – ' + leftOffice.substring(0,4);
			} else {
				leftOffice = ' – ?';
			}
			div.append(tookOffice + leftOffice);
			article.append(div);

			// div tag
			let strong = document.createElement('strong');
			strong.append(data[i]['party']);
			article.append(strong);
			
			// append to container
			presidentsOutput.append(article);
		}
	})
	.then((data) => {
		// observe entries
		let target = document.getElementsByClassName('m-president');
		for(j = 0; j < target.length; j++){
			observer.observe(target[j]);
		}
	});
