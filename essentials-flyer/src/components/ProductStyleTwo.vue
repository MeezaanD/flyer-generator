<template>
		<div class="container">
			<div class="product" v-for="(product, index) in limitedProducts" :key="index">
				<img :src="product.image" alt="Product Image" />
				<div class="product-content">
					<p class="product-price">{{ product.price }}</p>
					<p class="product-description">{{ product.description }}</p>
				</div>
			</div>
		</div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps(['products']);

// Computed property to limit products to 4
const limitedProducts = computed(() => {
	return props.products.slice(0, 4);
});
</script>

<style scoped>
.products-section {
	display: flex;
	justify-content: center;
}

.container {
	display: flex;
	flex-wrap: wrap;
	/* Allow wrapping */
	justify-content: space-evenly;
	/* Space out items */
	max-width: 1200px;
	/* Limit container width */
	margin: 0 auto;
	/* Center the container */
}

.product {
	background-color: #b0e0f0;
	/* Light blue for contrast */
	/* margin-bottom: 20px; */
	/* Spacing between rows */
	box-sizing: border-box;
	/* Include padding and borders in width calculation */
	padding: 10px;
	/* Add padding inside product */
}

.product-content {
	text-align: center;
	/* Center the content */
}
</style>
