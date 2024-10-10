<script setup>
import { ref, computed } from 'vue';

// Reactive properties for product details
const productName = ref('Product Name'); // Store the product name
const specificationsImage = ref(null); // Store the specifications image
const previewImage = ref(null); // Store the preview image
const description = ref('Just some sample text so long'); // Store the description text

// Define reactive properties for deal date
const dealValidFrom = ref(""); // Store the "valid from" date
const dealValidTo = ref("");   // Store the "valid to" date

// Function to handle image uploads
const handleImageUpload = (type, event) => {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			if (type === 'specifications') {
				specificationsImage.value = e.target.result; // Set the specifications image
			} else if (type === 'preview') {
				previewImage.value = e.target.result; // Set the preview image
			}
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
		link.download = 'product-specification.png';
		link.click();
	});
};

// Function to clear details
const clearDetails = () => {
	productName.value = '';
	specificationsImage.value = null;
	previewImage.value = null;
	description.value = ''; // Clear description as well
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
						<h2 class="flyer-heading">{{ productName }}</h2>
						<ul class="images">
							<li>
								<h4 class="product-heading">Product Specifications</h4>
								<img v-if="specificationsImage" :src="specificationsImage" alt="Specifications" class="product-image"/>
								<img v-else :src="placeholderImage" alt="Specifications Placeholder" class="product-image" />
							</li>
							<li>
								<h4 class="product-heading">Product Preview</h4>
								<img v-if="previewImage" :src="previewImage" alt="Preview" class="product-image"/>
								<img v-else :src="placeholderImage" alt="Preview Placeholder" class="product-image" />
							</li>
						</ul>
						<p class="flyer-description">{{ description }}</p>
						<!-- <h4 class="flyer-date">Deal valid from {{ dealValidFrom || 'X' }} to {{ dealValidTo || 'Y' }}</h4> -->
					</div>
				</div>
				<footer>
				</footer>
			</div>

			<div class="input-section" id="input-section">
				<h2>Edit Product Form</h2>

				<!-- Input for product name -->
				<label for="product-name">Product Name:</label>
				<input type="text" id="product-name" v-model="productName" placeholder="Enter product name" />

				<!-- Input for deal date -->
				<!-- <label for="deal-valid-from">Deal Valid From:</label>
				<input type="text" id="deal-valid-from" v-model="dealValidFrom" placeholder="Start Date" />

				<label for="deal-valid-to">Deal Valid To:</label>
				<input type="text" id="deal-valid-to" v-model="dealValidTo" placeholder="End Date" /> -->

				<!-- Input for description -->
				<label for="description">Description:</label>
				<textarea id="description" v-model="description" placeholder="Enter description"></textarea>

				<!-- Input for specifications image -->
				<label for="specifications-image">Upload Specifications Image:</label>
				<input type="file" @change="handleImageUpload('specifications', $event)" accept="image/*" />

				<!-- Input for preview image -->
				<label for="preview-image">Upload Preview Image:</label>
				<input type="file" @change="handleImageUpload('preview', $event)" accept="image/*" />

				<button @click="saveFlyerAsImage">Save as Image</button>
				<button @click="clearDetails">Clear Details</button>
			</div>
		</div>
	</body>
</template>

<style>
.product-image {
	max-width: 100%;
	height: auto;
}

.display {
	font-size: larger;
	font-weight: bolder;
}
</style>
