<script setup>
import { ref, computed } from 'vue';
import ProductStyleOne from './components/ProductStyleOne.vue';
import ProductStyleTwo from './components/ProductStyleTwo.vue';
import ProductStyleThree from './components/ProductStyleThree.vue';

// Reactive properties for product details
const productDetails = ref([
	{ title: 'Product 1', description: 'Sample Text', price: 'R0', image: null },
	{ title: 'Product 2', description: 'Sample Text', price: 'R0', image: null },
	{ title: 'Product 3', description: 'Sample Text', price: 'R0', image: null },
	{ title: 'Product 4', description: 'Sample Text', price: 'R0', image: null },
	{ title: 'Product 5', description: 'Sample Text', price: 'R0', image: null },
	{ title: 'Product 6', description: 'Sample Text', price: 'R0', image: null },
]);

const selectedStyle = ref('1');
const flyerHeading = ref('Welcome to Our Product Section'); // New heading text

// Define reactive properties for deal date
const dealValidFrom = ref(""); // Store the "valid from" date
const dealValidTo = ref("");   // Store the "valid to" date

const currentStyle = computed(() => {
	switch (selectedStyle.value) {
		case '1':
			return ProductStyleOne;
		case '2':
			return ProductStyleTwo;
		case '3':
			return ProductStyleThree;
		default:
			return ProductStyleOne;
	}
});

// Function to handle image uploads
const handleImageUpload = (index, event) => {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			productDetails.value[index].image = e.target.result; // Set the image source to Style
		};
		reader.readAsDataURL(file); // Convert image to base64
	}
};

// Function to save flyer as an image
const saveFlyerAsImage = () => {
	const flyer = document.getElementById('flyer');
	html2canvas(flyer).then((canvas) => {
		const link = document.createElement('a');
		link.href = canvas.toDataURL('image/png');
		link.download = 'flyer.png';
		link.click();
	});
};

// Function to clear product details
const clearDetails = () => {
	productDetails.value.forEach((product) => {
		product.price = 'R0';
		product.image = null;
		product.description = ''; // Clear description as well
	});
};

// Get the price with the 'R' prefix
const getPrice = (price) => {
	return price.substring(1); // Get the numeric part only
};

// Update the price while preserving the 'R' prefix
const updatePrice = (index, event) => {
	const value = event.target.value;
	// Allow only numbers and a single decimal point
	const formattedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	productDetails.value[index].price = `R${formattedValue}`;
};

// Update description with character limit
const updateDescription = (index, event) => {
	const newValue = event.target.value.slice(0, 120); // Limit to 110 characters
	productDetails.value[index].description = newValue;
};

</script>

<template>

	<body>
		<div class="container">
			<div class="flyer-container" id="flyer">
				<div class="main-content">
					<header>
					</header>
					<div class="offerings-section"></div>
					<div class="products-section">
						<h2 class="flyer-heading">{{ flyerHeading }}</h2>
						<!-- Display deal date dynamically -->
						<component :is="currentStyle" :products="productDetails" />
						<h4 class="flyer-date">Deal valid from {{ dealValidFrom || 'X' }} Till {{ dealValidTo || 'Y' }}
						</h4>
					</div>
				</div>
				<footer>
				</footer>
			</div>

			<div class="input-section" id="input-section">
				<h2>Edit Flyer</h2>

				<!-- Input for heading text -->
				<label for="heading-text">Flyer Heading:</label>
				<input type="text" id="heading-text" v-model="flyerHeading" placeholder="Enter flyer heading" />

				<!-- Input for deal date -->
				<label for="deal-valid-from">Deal Valid From:</label>
				<input type="text" id="deal-valid-from" v-model="dealValidFrom" placeholder="Start Date">

				<label for="deal-valid-to">Deal Valid Till:</label>
				<input type="text" id="deal-valid-to" v-model="dealValidTo" placeholder="End Date">

				<!-- Dropdown for selecting display style -->
				<label class="display" for="style-select">CHOOSE DISPLAY</label>
				<select v-model="selectedStyle" id="style-select">
					<option value="1">DISPLAY 6</option>
					<option value="2">DISPLAY 4</option>
					<option value="3">DISPLAY 5</option>
				</select>

				<!-- Loop through product details for input fields -->
				<div v-for="(product, index) in productDetails" :key="index">
					<h3>{{ product.title }}</h3>
					<input type="text" :value="getPrice(product.price)" @input="updatePrice(index, $event)"
						placeholder="Product Price" />
					<input type="text" v-model="product.description" @input="updateDescription(index, $event)"
						placeholder="Product Description" maxlength="110" />
					<input type="file" @change="handleImageUpload(index, $event)" accept="image/*" />
				</div>

				<button @click="saveFlyerAsImage">Save as Image</button>
				<button @click="clearDetails">Clear Details</button>
			</div>
		</div>
	</body>
</template>


<style>
/* Add your styles here */
.product-image {
	max-width: 100%;
	/* Set a max-width for images to fit in the flyer */
	height: auto;
	/* Maintain aspect ratio */
}

.display {
	font-size: larger;
	font-weight: bolder;
}
</style>
