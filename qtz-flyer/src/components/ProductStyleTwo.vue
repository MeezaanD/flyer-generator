<template>
	<div class="products-section">
		<div class="container">
			<div class="product" v-for="(product, index) in limitedProducts" :key="index">
				<img :src="product.image" alt="Product Image" />
				<div class="product-content">
					<p class="product-price">{{ product.price }}</p>
				</div>
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

.product {
	background-color: #e4eef1;
	padding: 10px;
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
</style>
