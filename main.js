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
fetch('https://randomuser.me/api/?results=60&inc=name,email,phone,location')
	// parse data
	.then((response) => response.json())
	// use data
	.then((data) => {
		const results = data.results;
		for(i = 0; i < results.length; i++){
			console.log(results[i]);
			// article tag
			let article = document.createElement('article');
			article.classList.add('m-president');

			// h2 tag
			let h2 = document.createElement('h2');
			h2.append(results[i].name.first + ' ' + results[i].name.last);
			article.append(h2);

			// a tag
			let a = document.createElement('a');
			a.setAttribute('href', 'mailto:'+results[i].email);
			a.append(results[i].email);
			article.append(a);

			// div tag
			let div2 = document.createElement('div');
			div2.append(results[i].phone);
			article.append(div2);

			// div tag
			let div3 = document.createElement('div');
			div3.append(results[i].location.street.name);
			article.append(div3);

			// div tag
			let div4 = document.createElement('div');
			div4.append(results[i].location.city);
			article.append(div4);

			// div tag
			let div5 = document.createElement('div');
			div5.append(results[i].location.postcode);
			article.append(div5);
			
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