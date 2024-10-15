<template>
	<div class="container">
		<div class="product" v-for="(product, index) in products" :key="index" :style="{ backgroundColor: backgroundColor }">
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

const props = defineProps({
	products: Array,
	backgroundColor: String // New prop for background color
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
	justify-content: space-between;
	max-width: 1200px;
	margin: 0 auto;
}

.product {
	width: calc(33.33% - 20px);
	padding: 10px;
	box-sizing: border-box;
}

.product-content {
	text-align: center;
}
</style>
