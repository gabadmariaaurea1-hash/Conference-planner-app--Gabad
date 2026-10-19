
import { useState } from "react";
import "./App.css";

const initialCategories = [
  {
    title: "Venue",
    items: [
      {
        name: "Conference Hall",
        description: "A spacious hall for meetings and conferences.",
        price: 500,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Hotel Ballroom",
        description: "An elegant venue for formal events.",
        price: 850,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Outdoor Garden",
        description: "A refreshing garden event space.",
        price: 400,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Hotel Conference Room",
        description: "A professional space for business meetings.",
        price: 650,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Convention Center",
        description: "A large venue for corporate gatherings.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Rooftop Venue",
        description: "A modern venue with an open-air atmosphere.",
        price: 750,
        image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=85",
      },
    ],
  },
  {
    title: "Add-ons",
    items: [
      {
        name: "Sound System",
        description: "Microphones and speakers for your event.",
        price: 150,
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Projector",
        description: "Equipment for presentations and videos.",
        price: 100,
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Event Decoration",
        description: "Decorative styling for your conference.",
        price: 200,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Photography",
        description: "Capture special moments during the event.",
        price: 250,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Stage and Lighting",
        description: "Lighting and stage setup for speakers.",
        price: 300,
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Wi-Fi Package",
        description: "Internet access for conference attendees.",
        price: 80,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=85",
      },
    ],
  },
  {
    title: "Meals",
    items: [
      {
        name: "Breakfast",
        description: "A delicious breakfast for attendees.",
        price: 15,
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Lunch",
        description: "A satisfying lunch meal.",
        price: 25,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Dinner",
        description: "A complete dinner for your guests.",
        price: 30,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Coffee Break",
        description: "Coffee, tea, and light refreshments.",
        price: 10,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Snacks",
        description: "Light snacks for breaks between sessions.",
        price: 8,
        image: "https://images.unsplash.com/photo-1621939514649-280e2aa2f926?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Buffet Meal",
        description: "A variety of dishes served buffet-style.",
        price: 40,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
      },
    ],
  },
];
const money = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

function App() {
  const [page, setPage] = useState("home");
  const [activeTab, setActiveTab] = useState("Venue");
  const [quantities, setQuantities] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");

  const selectedItems = initialCategories
    .flatMap((category) =>
      category.items.map((item) => ({
        ...item,
        category: category.title,
        quantity: quantities[item.name] || 0,
      }))
    )
    .filter((item) => item.quantity > 0);

  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const selectedCount = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function changeQuantity(itemName, change) {
    setQuantities((previous) => ({
      ...previous,
      [itemName]: Math.max(
        0,
        (previous[itemName] || 0) + change
      ),
    }));
  }

  function openDetails() {
    if (selectedItems.length === 0) {
      alert("Please select at least one expense first.");
      return;
    }

    setShowDetails(true);
  }

  function handleConfirmBooking() {
    if (selectedItems.length === 0) {
      alert("Please select at least one expense first.");
      setShowDetails(false);
      return;
    }

    const generatedNumber = `CEP-${Date.now()
      .toString()
      .slice(-8)}`;

    setBookingNumber(generatedNumber);
    setShowDetails(false);
    setBookingConfirmed(true);
  }

  function startPlanning() {
    setPage("planner");
    setActiveTab("Venue");
    setBookingConfirmed(false);
    setShowDetails(false);
  }

  function returnHome() {
    setPage("home");
    setBookingConfirmed(false);
    setShowDetails(false);
  }

  if (bookingConfirmed) {
    return (
      <div className="app-shell">
        <header className="navbar">
          <button className="brand" onClick={returnHome}>
            <span className="brand-icon">C</span>
            <span>
              <strong>Conference</strong>
              <small>Expense Planner</small>
            </span>
          </button>
        </header>

        <main className="confirmation-page">
          <section className="confirmation-card">
            <div className="success-icon">✓</div>
            <p className="eyebrow">PLAN CONFIRMATION</p>
            <h1>Booking Confirmed!</h1>
            <p className="confirmation-message">
              Your conference expense plan has been confirmed
              successfully. Here is your booking summary.
            </p>

            <div className="booking-reference">
              <span>Booking Reference</span>
              <strong>{bookingNumber}</strong>
            </div>

            <div className="confirmed-items">
              <h2>Booking Summary</h2>

              {selectedItems.map((item) => (
                <div
                  className="summary-row"
                  key={item.name}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <small>
                      {item.quantity} × {money(item.price)}
                    </small>
                  </div>
                  <strong>
                    {money(item.price * item.quantity)}
                  </strong>
                </div>
              ))}

              <div className="summary-total">
                <span>Total Expense</span>
                <strong>{money(total)}</strong>
              </div>
            </div>

            <div className="demo-notice">
              <strong>Demo confirmation</strong>
              <p>
                This is a sample confirmation for your school
                project. No actual venue or service has been
                reserved, and no payment has been made.
              </p>
            </div>

            <button
              className="primary-button full-button"
              onClick={returnHome}
            >
              Back to Home
            </button>

            <button
              className="text-button"
              onClick={startPlanning}
            >
              Create Another Plan
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <button className="brand" onClick={returnHome}>
          <span className="brand-icon">C</span>
          <span>
            <strong>Conference</strong>
            <small>Expense Planner</small>
          </span>
        </button>

        {page === "planner" && (
          <div className="nav-total">
            <span>Estimated Total</span>
            <strong>{money(total)}</strong>
          </div>
        )}
      </header>

      {page === "home" ? (
        <main>
          <section className="hero">
            <div className="hero-content">
              <span className="hero-label">
                PLAN SMARTER. MEET BETTER.
              </span>

              <h1>
                Your conference.
                <br />
                <span>Your way.</span>
              </h1>

              <p>
                Plan your perfect conference with ease. Choose
                your venue, select add-ons, organize meals, and
                keep every expense in one place.
              </p>

              <button
                className="primary-button hero-button"
                onClick={startPlanning}
              >
                Get Started <span>→</span>
              </button>

              <div className="hero-features">
                <span>✓ Easy planning</span>
                <span>✓ Live cost updates</span>
                <span>✓ Clear expense summary</span>
              </div>
            </div>
          </section>

          <section className="intro-section">
            <p className="eyebrow">SIMPLE. ORGANIZED. EFFICIENT.</p>
            <h2>Everything your event needs</h2>
            <p>
              From the perfect venue to meals for your guests,
              plan your conference one step at a time.
            </p>

            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-icon">⌂</div>
                <h3>Choose a Venue</h3>
                <p>
                  Find a suitable space for your conference.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">✦</div>
                <h3>Add Event Services</h3>
                <p>
                  Include equipment and decorations you need.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">♧</div>
                <h3>Plan Your Meals</h3>
                <p>
                  Add meals and calculate their estimated cost.
                </p>
              </article>
            </div>
          </section>
        </main>
      ) : (
        <main className="planner-page">
          <section className="planner-heading">
            <div>
              <p className="eyebrow">YOUR EVENT WORKSPACE</p>
              <h1>Plan your conference</h1>
              <p>
                Select what you need and track your estimated
                expenses as you go.
              </p>
            </div>

            <div className="selection-counter">
              <span>Selected items</span>
              <strong>{selectedCount}</strong>
            </div>
          </section>

          <nav className="planner-tabs">
            {["Venue", "Add-ons", "Meals"].map((tab) => (
              <button
                key={tab}
                className={
                  activeTab === tab
                    ? "planner-tab active"
                    : "planner-tab"
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab === "Venue" && (
                  <span className="tab-count">01</span>
                )}
              </button>
            ))}

            <button
              className="planner-tab details-tab"
              onClick={openDetails}
            >
              Show Details <span>→</span>
            </button>
          </nav>

          <section className="category-heading">
            <div>
              <h2>{activeTab}</h2>
              <p>
                {activeTab === "Venue"
                  ? "Choose the perfect location for your event."
                  : activeTab === "Add-ons"
                    ? "Add the equipment and services you need."
                    : "Plan meals for your conference attendees."}
              </p>
            </div>

            <span className="price-note">
              Prices in USD · Demo rates
            </span>
          </section>

          <section className="expense-grid">
            {initialCategories
              .find((category) => category.title === activeTab)
              .items.map((item) => {
                const quantity = quantities[item.name] || 0;

                return (
                  <article className="expense-card" key={item.name}>
                    <div className="expense-image-wrap">
                      <img
                        className="expense-image"
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                          event.currentTarget.parentElement.classList.add(
                            "image-fallback"
                          );
                        }}
                      />
                      <span className="image-category">
                        {activeTab}
                      </span>
                    </div>

                    <div className="expense-card-content">
                      <div className="expense-title-row">
                        <h3>{item.name}</h3>
                        {quantity > 0 && (
                          <span className="selected-badge">
                            Selected
                          </span>
                        )}
                      </div>

                      <p className="expense-description">
                        {item.description}
                      </p>

                      <div className="expense-card-bottom">
                        <div className="price-block">
                          <strong>{money(item.price)}</strong>
                          <span>
                            {activeTab === "Meals"
                              ? "per meal"
                              : "per item"}
                          </span>
                        </div>

                        <div className="quantity-control">
                          <button
                            aria-label={`Remove one ${item.name}`}
                            onClick={() =>
                              changeQuantity(item.name, -1)
                            }
                            disabled={quantity === 0}
                          >
                            −
                          </button>

                          <span>{quantity}</span>

                          <button
                            aria-label={`Add one ${item.name}`}
                            onClick={() =>
                              changeQuantity(item.name, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {quantity > 0 && (
                        <div className="item-subtotal">
                          Subtotal
                          <strong>
                            {money(item.price * quantity)}
                          </strong>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
          </section>

          <section className="planner-bottom">
            <div className="bottom-total">
              <span>Estimated Total Expense</span>
              <strong>{money(total)}</strong>
              <small>
                {selectedCount} item(s) selected
              </small>
            </div>

            <button
              className="primary-button"
              onClick={openDetails}
            >
              Review Expenses <span>→</span>
            </button>
          </section>

          <footer className="footer">
            Conference Expense Planner · School project demo
          </footer>
        </main>
      )}

      {showDetails && (
        <div
          className="modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowDetails(false);
            }
          }}
        >
          <section
            className="details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-title"
          >
            <button
              className="modal-close"
              onClick={() => setShowDetails(false)}
              aria-label="Close expense details"
            >
              ×
            </button>

            <p className="eyebrow">CHECK BEFORE CONFIRMING</p>
            <h2 id="details-title">Expense Summary</h2>
            <p className="modal-description">
              Review your selected venues, services, and meals.
            </p>

           
<div className="modal-items">
  <div className="expense-table-wrap">
    <table className="expense-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>

      <tbody>
        {selectedItems.map((item) => (
          <tr key={item.name}>
            <td>
              <strong>{item.name}</strong>
              <small className="table-category">
                {item.category}
              </small>
            </td>

            <td>{money(item.price)}</td>

            <td>
              <span className="table-quantity">
                {item.quantity}
              </span>
            </td>

            <td>
              <strong>
                {money(item.price * item.quantity)}
              </strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

<div className="summary-total modal-total">
  <div>
    <span>Total Expense</span>
    <small className="total-item-count">
      {selectedCount} item(s) selected
    </small>
  </div>

  <strong>{money(total)}</strong>
</div>


            <p className="review-note">
              Reviewing your expenses does not confirm a booking.
              Confirm only when you are satisfied with your plan.
            </p>

            <button
              className="primary-button full-button"
              onClick={handleConfirmBooking}
            >
              Confirm Booking <span>→</span>
            </button>

            <button
              className="text-button"
              onClick={() => setShowDetails(false)}
            >
              Go Back and Edit
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
