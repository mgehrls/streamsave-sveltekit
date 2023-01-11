<script>
  export let listItem;
  let deleted = false;
  import { enhance } from "$app/forms";
</script>

{#if !deleted}
  <div class="mediaCard">
    <img
      src={listItem.media.poster_path}
      alt={listItem.media.title + " poster"}
    />
    <div class="info">
      <a href={`/${listItem.media.type}s/${listItem.media.id}`}>
        <h2 class="mediaTitle">{listItem.media.title}</h2>
      </a>
    </div>
  </div>
  <form
    action="?/delete"
    method="POST"
    use:enhance={() => {
      return ({ form, result }) => {
        if (result.type === "success") {
          deleted = true;
        }
      };
    }}
  >
    <input type="hidden" name="id" value={listItem.media_id} />
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-trash"
        ><polyline points="3 6 5 6 21 6" /><path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        /></svg
      >
      <span class="hide-except-from-screenreader">Delete</span>
    </button>
  </form>
{/if}

<style>
  div.mediaCard {
    padding: 0.5rem 1rem;
    display: flex;
    gap: 1rem;
  }
  div.info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }
  .mediaTitle {
    text-decoration: none;
    font-weight: bold;
    color: black;
  }
  img {
    width: 33%;
    box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.7), -4px 4px 4px rgba(0, 0, 0, 0.5);
  }
  button {
    border: none;
    padding: 8px;
    background: none;
    font-size: 16px;
    display: inline-block;
    position: relative;
    z-index: 1;
  }
  a {
    display: block;
    color: #333;
    text-decoration: none;
  }
</style>
