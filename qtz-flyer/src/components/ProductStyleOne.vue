<template>
	<div class="products-section">
		<div class="container">
			<div class="product" v-for="(product, index) in products" :key="index">
				<img :src="product.image" alt="Product Image" />
				<div class="product-content">
					<p class="product-price">{{ product.price }}</p>
				</div>
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
	background-color: #e4eef1;
	width: calc(33.33% - 20px);
	/* Three products per row with space */
	margin-bottom: 20px;
	/* Spacing between rows */
	box-sizing: border-box;
	padding: 10px;
}
</style>
