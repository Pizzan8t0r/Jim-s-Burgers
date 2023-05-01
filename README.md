# Jim-s-Burgers
##
As apps grow in size and complexity, their load times can start to lag. And when users around the world try to access those apps from aging mobile devices with spotty connections, load times can slow to a snail’s pace. That’s why performance optimization is so crucial to a good experience for every user.
PWAs, blend the benefits of a traditional browser experience with those of a mobile application. PWAs can ensure applications work without an internet connection by using the Service Worker and Cache APIs to cache assets and API responses.
To deliver smaller application bundle sizes to the client, i'll perform several optimizations that involve compressing assets—from minifying JavaScript and CSS files to compressing images. I will also use a technique called lazy loading to defer loading certain assets until they're needed by the application.
I will be using a module bundler for JavaScript called webpack; webpack simplifies front-end web development by automating many of the aforementioned optimizations.
## Below is the plan of attack for the client's application:
Identify performance bottlenecks in web applications.
 Explain how performance can be measured in web applications.
  Explain the five main categories measured in a Lighthouse audit.
   Optimize CSS, JavaScript, and media assets for performance.
    Set up webpack in a new front-end project.
     Use service workers to cache assets for offline functionality.
      Optimize the app by minifying assets, adding offline functionality
       Convert an existing web application to a PWA.
        Use service workers to cache assets for offline functionality.
         Convert an existing web application to a PWA.
          Add a web manifest to your application.
### The tools used in creating my progressive web application 
Google Lighthouse is a tool that helps improve the performance of web applications by providing audits for performance, accessibility, Progressive Web Apps, and more. It's included in Chrome DevTools.

webpack -is a module bundler for JavaScript that simplifies front-end web development by generating static assets from modules with dependencies and using plugins and loaders to help automate certain optimization strategies. I will be using the webpack and webpack CLI

The webpack-bundle-analyzer plugin allows you to visualize the size of webpack output files with an interactive zoomable treemap.

The file-loader plugin resolves import/require() on a file into a URL and emits the file into the output directory.

The image-webpack-loader plugin allows you to enhance your image-loading process.

The SW-precache-webpack plugin allows you to use service workers to cache your external project dependencies. It will generate a service worker file, using sw-precache, and add it to your build directory.

The webpack-PWA-manifest plugin generates a manifest.json for your PWA, with auto icon resizing and fingerprinting support.
### Giving the application the ability to function even when the user is offline.
PWAs resemble native mobile apps and allow users to interact with the application even when there is no internet connection or cell service. Customers should be able to access data such as schedules, and menu items without worrying about having a cell signal or WiFi.
 Improving website load time
  Adding offline funcionality
   Allow users to download the application as if it were a phone app
###
As of 2019, more than 52 percent of web traffic was over mobile phones. Many of these phones do not have the same processing capabilities as desktop machines, nor their fast network connections.
A long delay in interactivity can lead to page abandonment. -- Page abandonment occurs when a user leaves a webpage without completing the task they set out to do. It is a very important aspect of making sure the performance of your application is adequate across all devices and connection speeds.
 53% of page loads were abandoned on mobile devices if the site took longer than 3 seconds to load.
  For every additional second of page load, 10% more users abandon the site.
   If the website takes less than 5 seconds to load, users stay on the site 70% longer.
## Lazy loading
We only need one image immediately. We can change this by applying a concept called lazy loading, which allows us to only download assets as they are needed. In our case, this would mean only loading the first image that appears in the image carousel with the initial page load.
Another useful technique that can speed up the initial render of the webpage is to lazy load the JavaScript files. In reality, JavaScript needs to load after the markup and DOM have been established. We can use a method to defer or pause loading the JavaScript files. This addresses a specific metric for the Lighthouse report that advises you to "Eliminate rendering-blocking resources."
## Analying Browser Resource Allocation
webpack's main objective is to reduce the processing time needed by the browser to render the webpage. This will improve the overall Time to Interactive (TTI) as well as the First Meaningful Paint (FMP). webpack's main approach is to bundle the JavaScript assets. By splitting the code into modules, webpack can bundle them into bite-sized chunks that can be loaded on demand. This will limit the browser's valuable processing power to focus on the critical chunks for the page load
![Diagram-Code-Split--](https://user-images.githubusercontent.com/131811220/235532460-1b37d991-85f3-4cd3-a32d-3022d5f18b15.jpg)
The time to download the files was the same because they are both the same size. In the initial transmission step, shrinking the payload through minification and uglification of the code will reduce the transmission time.
In the next step, after the files have been received, there is a big difference in the amount of time the browser needs to process the files—the image only took 0.092 seconds, while it took almost 3.5 seconds longer for the JavaScript file because it needed to be parsed and compiled before the browser can execute it. In other words, it takes a long time to not only translate the code from what people can read into something the browser can understand (i.e., machine code), but also to execute the code itself.
Because the browser's processing speeds are beyond our control, we must stick to ways to optimize our code for browser loading. webpack's ingenious method is to separate critical JavaScript from the non-critical code that can be lazily loaded by the browser
![300-image-vs-javascript](https://user-images.githubusercontent.com/131811220/235532867-4b6aa2d7-b13f-4aba-b9e9-ea9447f185fa.jpg)

We have an interactive tree map in the browser. We can click on each part to reveal the bundle sizes. Currently we have a single bundle being loaded to the browser in main.bundle.js. This means all the JavaScript assets need to be processed in order for any page to load. Large JavaScript files will tie up the browser's resources and processing power, delaying the Time to Interactive (TTI). We have shown that with minimal set up, we can use webpack out of the box and still get some performance gains. In the next step, we will code split the JavaScript into different modules or chunks
![400-Bundle-Analyze-Before-Split](https://user-images.githubusercontent.com/131811220/235533628-79593b0f-27cf-4c89-b01f-b3193563b752.jpg)
## Code split the app to separate concerns
I'll be using entry-point splitting to create multiple entry points and separate our JavaScript into distinct modules or files, which we will then connect in accordance to their dependencies. webpack tracks the dependencies of the JavaScript modules with a dependency graph. A script file can call multiple modules that can then call other modules, which forms a chain of dependencies. webpack can offload this task by creating bundles based on the dependency graph. webpack starts at the entry point and tracks each dependency and bundles this code together. Each entry point becomes a bundle based on the dependency graph and its interlinked modules
![500-Dependency-graph](https://user-images.githubusercontent.com/131811220/235534187-883f3d9e-4f9f-49c3-859f-fb12c5777459.png)
When creating multiple entry points, it is especially advantageous to split code based on its responsibility for different page loads. Then we can load each bundle on demand when that particular page is being loaded. This alone will make the JavaScript bundle size for each page just a fraction of the previous size. Let's try and organize our objects and functions into new groupings that will form our modules.
Simply based on the conditional statements, we can see DOM manipulation specific for each webpage. Separating the JavaScript assets based on the webpages is a great strategy and will allow lazy loading, because only one page can load at a time. Let's create three new JavaScript files located in the js folder in the assets folder and move the corresponding conditional statements and their respective code blocks from the script.js file to the appropriate files
