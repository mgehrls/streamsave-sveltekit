# Streamsave w/ sveltekit

A fullstack app built with sveltekit, supabase, and themovidbd.org's api.

A previous version was made in Next.JS. See that significantly inferior versions repo here: https://github.com/mgehrls/streamsavepro

Users can create their own account with email and password or log in with a preexisting google account through OAuth. SSR where possible, use of sveltekit stores and sveltes ability to create its own api routes which is how the app completes api searches without client side having access to the api key.

Recent additions:
Search bar previews results after debounce. If you hit enter you are taken to a search result page that is server rendered.

Todos: 
I haven't put any thought into typography and the color scheme is what the sveltekit template started with. 
check excalidraw for mobile layout plan.
