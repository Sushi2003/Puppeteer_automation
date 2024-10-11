/**
This is the file with separate functions and automation of udemy course headings fetcher
 */

const puppeteer = require('puppeteer');
const readline = require('readline');

// Function to get user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask the user for the search query
rl.question('Enter the search query (q parameter): ', async (query) => {
    const searchQuery = encodeURIComponent(query); // Encode the user input

    // Launch puppeteer browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set headers for the request
    await page.setExtraHTTPHeaders({
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en;q=0.7',
        'cookie': '__udmy_2_v57r=573ce20f514b4b68b2a481ce801ddbbc; existing_user=true; optimizelyEndUserId=oeu1728533517892r0.2118963044933304; ud_firstvisit=2024-10-10T04:11:58.932788+00:00:1sykWt:HtWCSjYdoGFY-ZJSk6WDQrMrvBQBREiYOASKc1_4gNk; _ga=GA1.1.1062129692.1728533522; __stripe_mid=3461e82c-a475-4747-b3a9-3a41f0f5fab0b4de98; csrftoken=4u76wR2R6kL1P1Lk6FhYQWdoVkt3KKn5; __cfruid=d215df37a40a3a1c9d9859eab383ba690fc3835c-1728660486; ud_cache_brand=INen_US; ud_cache_marketplace_country=IN; ud_cache_price_country=IN; ud_cache_release=0aa17c38b8a05080196d; ud_cache_user=""; ud_cache_version=1; ud_cache_language=en; ud_cache_device=None; ud_cache_logged_in=0; ab.storage.deviceId.5cefca91-d218-4b04-8bdd-c8876ec1908d=%7B%22g%22%3A%22ca1f9445-65b6-0a67-e8c9-8e8e68c9e9cb%22%2C%22c%22%3A1728533521471%2C%22l%22%3A1728670361238%7D; __stripe_sid=c3eb4e81-033d-483d-927b-30379c20b98d0ed8d1; last_searched_phrase=4d0a30b00483fbab6ac61c0dd5f387c0; query_session_identifier_id=ZmM1MjgyNDgtOTA0NC00Mm; __cf_bm=Br0pXQ4YBtV4Okf5889KUmC8PYLQX.67F4TXw_JF.FY-1728671547-1.0.1.1-_VLtnUZw79bT_Gpt3ap.PDQvocOKLhciNkPG9loQnj1a5MfaDHxx1KnUK4vRzwpE5ayggqQyCVai5RlEOdmOyQ; cf_clearance=0.vdpuSX8Pp9DcIMjukkOH2ipoktm6R.bTbhI.3wR7c-1728671547-1.2.1.1-dR1n8Eb2OYtNsncjW1NNH.qWnx8xLS5o5oBQwTLsDRb4BWxh1KwEhkb8EoD4hzvn8sizuUefAxh8RZdT4ipN9Vv4m1Q3bzmjT.ofdLYQjRAXqVr2EV5ZYlb0amh6AXEl3NpPAFT2uMYKU9salucIk8fUxSA8JWdG3_bJGZ1w2vwMS3W7v0mtljXmbFI6nu.FEjViQrCZJdzUlS4KC08SkqtNfotWGmITTc2tQUKjXRzeX1swMTPjRVGX0qEF80FN6AshwLDKAjj8N6xolFQ4_3Hon9EkZKSz0QiBN7iAB8EnRLTy6d_AUhFf6mw1dbn8JFfLTQPaf2iu5fkZwdxqxCJpaKu6piGWb2SZBjmS.o1.vq1VdGl22ne5Sr2TroIjDZkbNi4iw17FPjRrCgoVKA',
        'priority': 'u=1, i',
        'referer': 'https://www.udemy.com/courses/search/?src=ukw&q=system+design',
        'sec-ch-ua': '"Brave";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        'x-udemy-cache-brand': 'INen_US',
        'x-udemy-cache-campaign-code': 'LEARNNOWPLANS',
        'x-udemy-cache-device': 'None',
        'x-udemy-cache-language': 'en',
        'x-udemy-cache-logged-in': '0',
        'x-udemy-cache-marketplace-country': 'IN',
        'x-udemy-cache-price-country': 'IN',
        'x-udemy-cache-release': '0aa17c38b8a05080196d',
        'x-udemy-cache-version': '1'
    });

    // Construct the URL with the user's search query
    const url = `https://www.udemy.com/api-2.0/search-courses/?src=ukw&q=${searchQuery}&skip_price=true`;

    // Navigate to the URL
    const response = await page.goto(url, {
        waitUntil: 'networkidle2'
    });

    // Extract the first course's ID from the JSON response
    const data = await response.json();
    const firstCourseId = data.courses[0].id; // Get the first course ID
    console.log('First Course ID:', firstCourseId); // Log the first course ID

    // Proceed with the second part: Fetching course details using the extracted course ID
    const encodedCourseId = encodeURIComponent(firstCourseId);  // Encode the course ID

    // Set headers for the course details request
    await page.setExtraHTTPHeaders({
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-GB,en;q=0.7',
        'referer': 'https://www.udemy.com/course/system-design-interview-prep/?couponCode=ST14MT101024',
        'sec-ch-ua': '"Brave";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        'x-udemy-cache-brand': 'INen_US',
        'x-udemy-cache-campaign-code': 'ST14MT101024',
        'x-udemy-cache-device': 'None',
        'x-udemy-cache-language': 'en',
        'x-udemy-cache-logged-in': '0',
        'x-udemy-cache-marketplace-country': 'IN',
        'x-udemy-cache-price-country': 'IN',
        'x-udemy-cache-release': '66c9fd9a44800809687e',
        'x-udemy-cache-version': '1'
    });

    // Set cookies for the course details request
    const cookies = [
        {
            name: '__udmy_2_v57r',
            value: '573ce20f514b4b68b2a481ce801ddbbc',
            domain: '.udemy.com',
            path: '/',
        },
        {
            name: 'ud_cache_brand',
            value: 'INen_US',
            domain: '.udemy.com',
            path: '/',
        },
        // Add other cookies similarly
    ];

    await page.setCookie(...cookies);

    // Intercept network requests and wait for the specific response
    page.on('response', async (response) => {
        const requestUrl = response.url();

        // Match the specific API URL you're interested in
        if (requestUrl.includes(`/api-2.0/course-landing-components/${encodedCourseId}/me/`)) {
            const jsonResponse = await response.json();  // Parse JSON directly from response

            // Extract the course title, instructors, and curriculum
            const course = jsonResponse.add_to_cart.buyables[0];
            const courseTitle = course.title;
            const instructors = course.visible_instructors.map(instructor => instructor.title);

            // Clean description by removing <p> tags
            const cleanDescription = (description) => {
                if (description) {
                    return description.replace(/^<p>/, '').replace(/<\/p>$/, '');
                }
                return null;
            };

            // Extract curriculum sections and lecture titles
            const curriculum = jsonResponse.curriculum_context.data.sections.map(section => {
                return {
                    sectionTitle: section.title,
                    lectures: section.items.map(item => {
                        const lecture = { title: item.title };
                        if (item.description) {
                            lecture.description = cleanDescription(item.description);
                        }
                        return lecture;
                    })
                };
            });

            // Format and log the data
            const formattedData = {
                courseTitle: courseTitle,
                instructors: instructors,
                curriculum: curriculum
            };
            console.log(JSON.stringify(formattedData, null, 2));  // Pretty-print with 2-space indentation
        }
    });

    // Construct the URL with the dynamic course ID
    const detailsUrl = `https://www.udemy.com/api-2.0/course-landing-components/${encodedCourseId}/me/?couponCode=ST14MT101024&components=add_to_cart,available_coupons,base_purchase_section,buy_button,buy_for_team,cacheable_buy_button,cacheable_deal_badge,cacheable_discount_expiration,cacheable_price_text,cacheable_purchase_text,curated_for_ufb_notice_context,curriculum_context,deal_badge,discount_expiration,gift_this_course,incentives,instructor_links,lifetime_access_context,money_back_guarantee,price_text,purchase_tabs_context,purchase,recommendation,redeem_coupon,sidebar_container,purchase_body_container`;

    // Navigate to the course details page to trigger the API call
    await page.goto(detailsUrl, { waitUntil: 'networkidle2' });

    // Close the browser
    await browser.close();
    rl.close(); // Close the readline interface
});