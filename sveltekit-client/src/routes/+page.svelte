<script>
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation'
  
    let dailyExp = writable('');
  
    const handleSetDailyExp = () => {
      console.log($dailyExp);
      // You can add logic here to handle the daily experience as needed
      goto('/mood-trends');
    };
  </script>
  
  <div class='bg-[#F3F3F3] h-screen w-screen flex pr-3 flex-col'>
    <form on:submit|preventDefault={handleSetDailyExp} class="pt-20 pl-4 justify-center items-center flex flex-col">
      <h2 class="font-bold text-gray-600">Add your daily experience</h2>
      <input
        bind:value={$dailyExp}
        class="h-[6rem] w-[22rem] outline-none mt-4 rounded-md bg-white px-4 pb-10 shadow-inner"
        type="text"
        placeholder="Type your daily experience here..."
        style="lineHeight: 2rem"
      />
      <div class="pt-8 pl-4">
        <button
          type="submit"
          class='h-[3rem] w-[21rem] bg-[#43C59D] rounded-md text-white text-lg  mt-[15rem]'
        >Get my mood</button>
      </div>
    </form>
  </div>
  