<template>
	<!-- 弹出框 -->
	<u-popup v-model="showpop" :mask-close-able='mask' mode="center" border-radius="15" @close="close" closeable>
		<view class="model-wraper">
			<view>{{ poplist.name }}</view>
			<view>已选：{{flavor}}</view>
			<view>规格：</view>
			<view class="flavor">
				<text v-for="specification in poplist.specifications" :key="specification.id" @click="selectId(specification)"
				 :class="{ selectcolor: selectid === specification.id }">{{ specification.flavor }}</text>
			</view>
			<view class="addcart">
				<view>
					<text style="font-size: 0.75rem">¥</text>
					{{ poplist.price }}
				</view>
				<view @click="addfood(poplist,flavor)">加入购物车</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				mask: false,
				showpop: false,
				selectid: 1,
				flavor: ''
			};
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			poplist: {
				type: Object,
				default: {}
			},
			firstflavor:{
				type: String,
				default:''
			}
		},
		watch: {
			show(val) {
				this.showpop = val;
			},
			poplist(val) {
					if (this.flavor === '') {
						this.flavor = this.firstflavor;
					}else{
						this.flavor = val.flavor
					}
			}
		},
		methods: {
			selectId(data) {
				this.flavor = data.flavor;
				this.selectid = data.id;
			},
			// 添加到购物车
			addfood(data, flavor) {
				this.showpop = false
				this.$emit("popdata", ++data.count, flavor)
			},
			// 关闭事件
			close() {
				console.log("执行关闭方法")
				this.showpop = false
				this.$emit("close", this.showpop)
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 对话框 */
	.model-wraper {
		width: 600rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 36rpx;

		view:nth-child(1) {
			text-align: center;
			font-size: 0.875rem;
			font-weight: 600;
		}

		view:nth-child(2) {
			text-align: center;
			font-size: 0.75rem;
			color: #666666;
			padding-top: 18rpx;
			padding-bottom: 20rpx;
		}

		view:nth-child(3) {
			font-size: 0.75rem;
		}
	}

	.flavor {
		font-size: 0.75rem;
		margin-top: 36rpx;
		margin-bottom: 68rpx;

		text {
			margin-right: 50rpx;
			border-radius: 50rpx;
			color: #333333;
			border: 2rpx #999999 solid;
			padding: 8rpx 36rpx;
		}
	}

	.addcart {
		display: flex;
		align-items: center;
		justify-content: space-between;

		view:first-child {
			color: #d81e06;
			font-size: 1rem;
		}

		view:last-child {
			background-color: #d81e06;
			font-size: 0.75rem;
			border-radius: 50rpx;
			padding: 15rpx 28rpx;
			color: #ffffff;
		}
	}

	.selectcolor {
		color: rgb(215, 36, 45) !important;
		border: 2rpx rgb(215, 36, 45) solid !important;
		background-color: rgb(255, 239, 240) !important;
		font-weight: 600 !important;
	}
</style>
