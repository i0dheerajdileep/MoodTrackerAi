<script>
   import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { sineOut } from 'svelte/easing';
    import { Progressbar } from 'flowbite-svelte';
    import {happyTasks,sadTasks,neutralTasks, moodVal} from '../../store/store'

    let total = writable(0);
    let tasks = writable([]);
    const hi = '20'
    console.log(hi)
    let newTotal;

    const unsubscribe = total.subscribe(value => {
        newTotal = value;
        console.log(newTotal);
    });

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        const checkboxValue = isChecked ? 33 : 0;
        total.update((prevTotal) => prevTotal + checkboxValue);
    };

    const handleSubmit = () => {
        console.log('Simulating API request success');
        goto('/success');
    };

    if(0.05>moodVal>0.01 )
    {
        tasks.set(happyTasks)
    }
    if(0.01>=moodVal>0.01){
        tasks.set(neutralTasks)
    }
    if(-0.01>moodVal>-0.05){
        tasks.set(sadTasks)
    }
    console.log("tasks",$tasks)
</script>

<div class='bg-gray-100 h-screen'>
    <div class='overflow-y-auto'>
        <div>
            <div class='flex flex-col mt-[1.5rem] justify-center items-center'>
                <h3 class='text-[#1F695D] text-xl font-semibold ml-3 mt-1 '>Please do the specified tasks</h3>
                <!-- <h3 class='text-[#1F695D] text-xl mt-5 mr-5 font-semibold'>Day 1</h3> -->
            </div>
            <div class="p-10">
                <Progressbar
                    progress = {$total}
                    animate
                    precision={2}
                    labelInside
                    tweenDuration={1500}
                    easing={sineOut}
                    size="h-6 w-full"
                    labelInsideClass="bg-blue-600 text-blue-100 text-base font-medium text-center p-1 leading-none rounded-full"
                    class="mb-8 bg-gray-400"
                />
            </div>
        </div>
        <div class='mt-[30px] flex justify-center flex-col items-center'>
            <ul class="list-disc pl-8 space-y-3 ml-[20px]">
                {#each $tasks as task (task.id)}
                    <li class='flex flex-row'>
                        <label for={`item${task.id}`} class='text-[#5B5858] text-lg w-[250px] font-medium'>{task.description}</label>
                        <input
                            type="checkbox"
                            id={`item${task.id}`}
                            class='ml-[1rem] w-[24px] h-[24px] checkbox-green'
                            on:change={handleCheckboxChange}
                            value='33'
                        />
                    </li>
                {/each}
            </ul>
            <button
                class={`left-[7.44%] right-[6.67%] text-white ${
                    $total <= 99 ? 'bg-[#43C59D]' : 'bg-[#C5F0CC]'
                } rounded-2xl font-medium text-lg leading-6 w-[335px] h-[52px] mt-[27px]`}
                on:click={handleSubmit}
                disabled={$total <= 85}
            >
                Submit
            </button>
        </div>
    </div>
</div>
