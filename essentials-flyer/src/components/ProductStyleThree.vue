<template>
	<div class="products-section">
		<div class="container">

			<!-- First Row: 2 Products -->
			<div class="product-row">
				<div class="product" v-for="(product, index) in products.slice(0, 2)" :key="index">
					<img :src="product.image" alt="Product Image" />
					<div class="product-content">
						<p class="product-price">{{ product.price }}</p>
					</div>
				</div>
			</div>

			<!-- Second Row: 1 Centered Product -->
			<div class="product-row centered-row">
				<div class="product single-product">
					<img :src="products[2].image" alt="Product Image" />
					<div class="product-content">
						<p class="product-price">{{ products[2].price }}</p>
					</div>
				</div>
			</div>

			<!-- Third Row: 2 Products -->
			<div class="product-row">
				<div class="product" v-for="(product, index) in products.slice(3, 5)" :key="index">
					<img :src="product.image" alt="Product Image" />
					<div class="product-content">
						<p class="product-price">{{ product.price }}</p>
					</div>
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
	justify-content: space-evenly;
	max-width: 1200px;
	margin: 0 auto;
}

.product-row {
	display: flex;
	justify-content: space-between;
	width: 100%;
}

.product-row:first-of-type {
	margin-bottom: -90px;
	/* Move first row closer to the center row */
}

.product-row:last-of-type {
	margin-top: -90px;
}

/* Centered product row */
.centered-row {
	justify-content: center;
}

.product {
	background-color: #b0e0f0;
	width: calc(50% - 20px);
	/* Two products per row */
	margin-bottom: 10px;
	/* Reduced gap between products */
	box-sizing: border-box;
	padding: 10px;
}

.single-product {
	width: calc(50%);
	/* Single centered product */
}

.product img {
	width: 100%;
	height: auto;
}

.product-content {
	text-align: center;
}
</style>
