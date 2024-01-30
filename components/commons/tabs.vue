<template>
    <div role="tablist" class="tabs tabs-lifted">
        <template v-for="(slot, i) in props.slots" :key="i">
            <template v-if="i === 0">
                <input checked type="radio" name="my_tabs_2" role="tab" class="tab min-w-28" :aria-label="`${slot.name}`"
                    />
                <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 ">
                    <slot :name = "slot.slot"></slot>
                </div>
            </template>
            <template v-else>
                <input type="radio" name="my_tabs_2" role="tab" class="tab min-w-28" :aria-label="`${slot.name}`"
                    />
                <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
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