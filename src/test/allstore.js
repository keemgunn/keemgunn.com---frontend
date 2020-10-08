console.log(Reflect.ownKeys(this.$store.state));
console.log(Reflect.ownKeys(this.$store.getters));
console.log(Reflect.ownKeys(this.$store._mutations));
console.log(Reflect.ownKeys(this.$store._actions));

// 스토어가 이니셜라이징 되기 전에는 사용 불가하다

