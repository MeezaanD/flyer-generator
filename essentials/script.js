// Combined flyer save functions
function saveFlyer(type) {
	const flyer = document.getElementById('flyer');
	const scaleValue = type === 'pdf' ? 2 : 3;
	html2canvas(flyer, { scrollY: 0, useCORS: true, scale: scaleValue })
		.then(canvas => {
			if (type === 'pdf') {
				const imgData = canvas.toDataURL('image/png');
				const { jsPDF } = window.jspdf;
				const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

				const pdfWidth = 210, pdfHeight = 297;
				const canvasWidth = canvas.width, canvasHeight = canvas.height;
				const aspectRatio = canvasWidth / canvasHeight;

				let pdfImageWidth = pdfWidth;
				let pdfImageHeight = pdfWidth / aspectRatio;
				if (pdfImageHeight > pdfHeight) {
					pdfImageHeight = pdfHeight;
					pdfImageWidth = pdfHeight * aspectRatio;
				}

				const xOffset = (pdfWidth - pdfImageWidth) / 2;
				const yOffset = (pdfHeight - pdfImageHeight) / 2;

				pdf.addImage(imgData, 'PNG', xOffset, yOffset, pdfImageWidth, pdfImageHeight);
				pdf.save('flyer.pdf');
			} else {
				const link = document.createElement('a');
				link.href = canvas.toDataURL('image/png');
				link.download = 'flyer.png';
				link.click();
			}
		})
		.catch(error => console.error('Error generating flyer:', error));
}

// Use for both saving as image and PDF
function saveFlyerAsImage() {
	saveFlyer('image');
}

function saveFlyerAsPDF() {
	const flyer = document.getElementById('flyer');
	html2canvas(flyer, {
		scrollY: 0,
		useCORS: true,
		scale: 2
	}).then(canvas => {
		const imgData = canvas.toDataURL('image/png');
		const { jsPDF } = window.jspdf;

		// Get the dimensions of the rendered flyer (canvas)
		const canvasWidth = canvas.width;
		const canvasHeight = canvas.height;

		// Fixed PDF width (210 mm for A4 width), height adjusted dynamically
		const pdfWidth = 210; // A4 width in mm
		const aspectRatio = canvasWidth / canvasHeight;
		const pdfHeight = pdfWidth / aspectRatio; // Adjust the height based on the flyer aspect ratio

		const pdf = new jsPDF({
			orientation: 'portrait',
			unit: 'mm',
			format: [pdfWidth, pdfHeight] // Set custom page size based on the flyer dimensions
		});

		// Add horizontal links at the top
		pdf.setFontSize(14);
		pdf.setTextColor(0, 0, 255);  // Blue text color for links

		// Adding links next to each other
		pdf.textWithLink('Website', 10, 10, { url: 'https://www.essentialscpt.co.za/' });
		pdf.textWithLink('WhatsApp', 60, 10, { url: 'https://wa.me/1234567890' }); // WhatsApp link
		pdf.textWithLink('Facebook', 110, 10, { url: 'https://web.facebook.com/strandfonteinrd' }); // Facebook link

		// Leave a bit of space after the links
		const yOffset = 20;

		// Add the flyer image to the PDF
		pdf.addImage(imgData, 'PNG', 0, yOffset, pdfWidth, pdfHeight - yOffset);

		// Save the PDF
		pdf.save('flyer_with_links.pdf');
	}).catch(error => {
		console.error('Error generating PDF:', error);
	});
}


// Handle image uploads
// Handle image uploads
function handleImageUpload(inputId, imgId, productId) {
	document.getElementById(inputId).addEventListener('change', function (event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const imgElement = document.getElementById(imgId);
				imgElement.src = e.target.result;

				// Set the uploaded image as the background
				const product = document.getElementById(productId);
				product.style.backgroundImage = `url(${e.target.result})`;
				product.style.backgroundSize = 'cover';
				product.style.backgroundPosition = 'center';

				// Hide title and description
				const productContent = product.querySelector('.product-content');
				productContent.style.display = 'flex';
				const productDetails = product.querySelector('.product-details');
				productDetails.style.display = 'none'; // Hide title and description
			};
			reader.readAsDataURL(file);
		}
	});
}

// Initialize image upload handlers
['product1', 'product2', 'product3', 'product4', 'product5', 'product6'].forEach((product, index) => {
	handleImageUpload(`${product}-img-input`, `${product}-img`, product);
});


// Load saved data from localStorage
window.onload = function () {
	const savedDetails = JSON.parse(localStorage.getItem('flyerDetails'));
	if (savedDetails) {
		Object.keys(savedDetails).forEach((product, index) => {
			document.getElementById(`${product}-title`).innerText = savedDetails[product].title;
			document.getElementById(`${product}-description`).innerText = savedDetails[product].description;
			document.getElementById(`${product}-price`).innerText = savedDetails[product].price;
		});
	}
};

// Save to localStorage
function saveToLocalStorage() {
	const flyerDetails = {};
	['product1', 'product2', 'product3', 'product4'].forEach(product => {
		flyerDetails[product] = {
			title: document.getElementById(`${product}-title`).innerText,
			description: document.getElementById(`${product}-description`).innerText,
			price: document.getElementById(`${product}-price`).innerText
		};
	});
	localStorage.setItem('flyerDetails', JSON.stringify(flyerDetails));
}

// Add event listeners for inputs
document.querySelectorAll('[id$="-input"]').forEach(input => {
	input.addEventListener('input', function () {
		const id = this.id.replace('-input', '');
		document.getElementById(id).innerText = this.value;
		saveToLocalStorage();
	});
});

// Clear all details and localStorage
function clearDetails() {
	localStorage.removeItem('flyerDetails');
	location.reload();
}
