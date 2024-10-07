<template>
	<div class="container">
		<div class="product" v-for="(product, index) in products" :key="index">
			<img :src="product.image" alt="Product Image" />
			<div class="product-content">
				<p class="product-price">{{ product.price }}</p>
				<p class="product-description">{{ product.description }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['products']);
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
	justify-content: space-between;
	/* Space out items */
	max-width: 1200px;
	/* Limit container width */
	margin: 0 auto;
	/* Center the container */
}

.product {
	background-color: #b0e0f0;
	width: calc(33.33% - 20px);
	/* Three products per row with space */
	/* margin-bottom: 10px; */
	padding: 10px;
	/* Spacing between rows */
	box-sizing: border-box;
}
</style>
