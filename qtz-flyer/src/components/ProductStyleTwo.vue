<template>
	<div class="container">
		
		<!-- Product items -->
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
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
	products: Array,
	backgroundColor: String // New prop for background color
});

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
	justify-content: space-evenly;
	max-width: 1200px;
	margin: 0 auto;
}

.product {
	box-sizing: border-box;
	padding: 10px;
}

.product-content {
	text-align: center;
}
</style>
