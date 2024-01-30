<template>
    <div role="tablist" class="tabs tabs-lifted">
        <template v-for="(slot, i) in props.slots" :key="i">
            <template v-if="i === 0">
                <input :id = "`label` + i" checked type="radio" name="my_tabs_2" role="tab" class="tab min-w-28" :aria-label="`${slot.name}`"
                    />
                <div role="tabpanel" class="tab-content py-5">
                    <slot :name = "slot.slot"></slot>
                </div>
            </template>
            <template v-else>
                <input :id = "`label` + i" type="radio" name="my_tabs_2" role="tab" class="tab" :aria-label="`${slot.name}`"
                    />
                <div role="tabpanel" class="tab-content w-full py-5">
                    <slot :name = "slot.slot"></slot>
                </div>
            </template>
        </template>
    </div>
</template>
<script setup lang="ts">
interface SlotsProps {
    name: string, 
    slot: string
}
const props = defineProps({
    slots: Array<SlotsProps>
})

</script>