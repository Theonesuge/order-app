<script>
export default {
	onShow() {
		// 获取手机信息
		uni.getSystemInfo({
			success: res => {
				uni.setStorage({
					key: 'device',
					data: res
				});
			}
		});
	}
};
</script>

<style lang="scss">
// 引入uView的SCSS文件
@import 'uview-ui/index.scss';
</style>
