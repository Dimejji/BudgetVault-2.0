<script setup>
const props = defineProps({
  variant: { type: String, default: 'green' }, // green | gold | red | blue | purple
})
const variants = {
  green: 'bg-[#edf5f2] text-[#167456]',
  gold: 'bg-[#fff4cf] text-[#9a7110]',
  red: 'bg-[#fff0ec] text-[#b75a37]',
  blue: 'bg-[#eaf3ff] text-[#3c73c9]',
  purple: 'bg-[#f1edff] text-[#7255c8]',
}
</script>

<template>
  <span
    class="text-[8px] font-extrabold px-[8px] py-[6px] rounded-full whitespace-nowrap"
    :class="variants[props.variant] || variants.green"
  >
    <slot />
  </span>
</template>
