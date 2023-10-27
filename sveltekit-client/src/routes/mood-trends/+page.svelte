<script>
    import { scaleLinear, scaleBand } from 'd3';
    import {onMount} from 'svelte'
    import { flip } from 'svelte/animate';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation'
  
    // Sample data for moods
    const data = [
      { mood: 'Happy', value: 0.8 },
      { mood: 'Angry', value: 0.5 },
      { mood: 'Sad', value: 0.3 },
      // Add more moods and values as needed
    ];
    const trendsData = writable([]);


    onMount(async () => {
    // Make a GET request when the component is mounted
    // const response = await fetch('/trends');

    // if (response.ok) {
    //   // If the request was successful, parse the JSON and update the store
    //   const responseData = await response.json();
    //   trendsData.set(responseData);

    //   // You can also log or manipulate the data here as needed
    //   console.log('Trends data fetched successfully', responseData);
    // } else {
    //   // Handle the error case here
    //   console.error('Failed to fetch trends data');
    // }
  });


    const handleNextClick =()=>{


        goto('/mood-tips')
    }
  
    const marginTop = 20;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 50;
    const width = 600;
    const height = 300;
    const xPadding = 0.2;
    const yFormat = '%';
    const yLabel = '↑ Mood Intensity';
    const color = 'steelblue';
    const yScalefactor = 6;
  
    let sortedData = data;
    $: reactiveShowSort = (input) => {
      if (input === 1) {
        return (sortedData = data.sort(
          (a, b) => a.mood.charCodeAt(0) - b.mood.charCodeAt(0)
        ));
      }
      if (input === 2) {
        return (sortedData = data.sort((a, b) => a.value - b.value));
      }
      if (input === 3) {
        return (sortedData = data.sort((a, b) => b.value - a.value));
      }
    };
  
    const x = 'mood';
    const y = 'value';
    $: reactiveXVals = sortedData.map((el) => el[x]);
    $: reactiveYVals = sortedData.map((el) => el[y]);
  
    $: reactiveXDomain = reactiveXVals;
    $: reactiveYDomain = [0, Math.max(...reactiveYVals)];
  
    const xRange = [marginLeft, width - marginRight];
    const yRange = [height - marginBottom, marginTop * 2];
    $: reactiveXScale = scaleBand(reactiveXDomain, xRange).padding(xPadding);
    $: reactiveYScale = scaleLinear(reactiveYDomain, yRange).nice();
  
    $: reactiveYTicks = reactiveYScale.ticks(yScalefactor);
    $: reactiveYTicksFormatted = reactiveYTicks.map((el) => el.toLocaleString('en-US'));
  </script>
  
  <div class="chart-container w-screen h-screen flex justify-center items-center flex-col" dir="auto">
    <div>
      <select class="dropdown" on:change={reactiveShowSort(this.selectedIndex)}>
        <option disabled selected value> ---Sorting Method--- </option>
        <option value="1">Default</option>
        <option value="2">{y}, Ascending</option>
        <option value="3">{y}, Descending</option>
      </select>
    </div>
  
    <svg {width} {height} viewBox="0 0 {width} {height}">
      <g class="x-axis" transform="translate(0,{height - marginBottom})">
        <path class="domain" stroke="black" d="M{marginLeft}, 0.5 H{width}" />
        {#each reactiveXVals as xVal, i}
          <g class="tick" opacity="1" transform="translate({reactiveXScale(xVal)},0)">
            <line
              x1={reactiveXScale.bandwidth() / 2}
              x2={reactiveXScale.bandwidth() / 2}
              stroke="black"
              y2="6"
            />
            <text y={marginBottom} dx={reactiveXScale.bandwidth() / 4}>{xVal}</text>
          </g>
        {/each}
      </g>
  
      <g class="y-axis" transform="translate({marginLeft}, 0)">
        {#each reactiveYTicks as tick, i}
          <g class="tick" opacity="1" transform="translate(0, {reactiveYScale(tick)})">
            <line class="tick-start" stroke="black" stroke-opacity="1" x2="-6" />
            <line class="tick-grid" x2={width - marginLeft - marginRight} />
            <text x={-marginLeft} y="10">{yFormat === '%' ? reactiveYTicksFormatted[i] * 100 + yFormat : reactiveYTicksFormatted[i] + yFormat}</text>
          </g>
        {/each}
        <text x="-{marginLeft}" y={marginTop}>{yLabel}</text>
      </g>
  
      <g class="bars">
        {#each reactiveYVals as bar, i (bar)}
          <rect
            x={reactiveXScale(reactiveXVals[i])}
            y={reactiveYScale(reactiveYVals[i])}
            width={reactiveXScale.bandwidth()}
            height={reactiveYScale(0) - reactiveYScale(bar)}
            fill={color}
            animate:flip="{{duration: 1000}}"
          />
        {/each}
      </g>
    </svg>
    <div class="pt-14 pl-4">
      <button
        on:click={handleNextClick}
        class='h-[3rem] w-[21rem] bg-blue-500 rounded-md text-white text-lg  '
      >Next</button>
    </div>
  </div>
  
  <style>
    /* Styles remain unchanged */
  </style>
  