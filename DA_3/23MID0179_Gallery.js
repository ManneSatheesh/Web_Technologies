const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(function (btn) {
	btn.addEventListener('click', function () {
		filterButtons.forEach(function (b) {
			b.classList.remove('active');
		});
		btn.classList.add('active');

		var selectedCategory = btn.getAttribute('data-category');

		galleryItems.forEach(function (item) {
			if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
				item.classList.remove('hidden');
			} else {
				item.classList.add('hidden');
			}
		});
	});
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

var currentIndex = 0;

function getVisibleItems() {
	var visible = [];
	galleryItems.forEach(function (item) {
		if (!item.classList.contains('hidden')) {
			visible.push(item);
		}
	});
	return visible;
}

function openLightbox(index) {
	var visibleItems = getVisibleItems();
	currentIndex = index;
	var img = visibleItems[currentIndex].querySelector('img');
	lightboxImg.src = img.src;
	lightboxCaption.textContent = img.alt;
	lightbox.classList.add('open');
}

function closeLightbox() {
	lightbox.classList.remove('open');
	lightboxImg.src = '';
}

function showPrev() {
	var visibleItems = getVisibleItems();
	currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
	var img = visibleItems[currentIndex].querySelector('img');
	lightboxImg.src = img.src;
	lightboxCaption.textContent = img.alt;
}

function showNext() {
	var visibleItems = getVisibleItems();
	currentIndex = (currentIndex + 1) % visibleItems.length;
	var img = visibleItems[currentIndex].querySelector('img');
	lightboxImg.src = img.src;
	lightboxCaption.textContent = img.alt;
}

galleryItems.forEach(function (item) {
	item.addEventListener('click', function () {
		var visibleItems = getVisibleItems();
		var index = visibleItems.indexOf(item);
		if (index !== -1) {
			openLightbox(index);
		}
	});
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

lightbox.addEventListener('click', function (e) {
	if (e.target === lightbox) {
		closeLightbox();
	}
});


document.addEventListener('keydown', function (e) {
	if (!lightbox.classList.contains('open')) return;

	if (e.key === 'Escape') {
		closeLightbox();
	} else if (e.key === 'ArrowLeft') {
		showPrev();
	} else if (e.key === 'ArrowRight') {
		showNext();
	}
});
