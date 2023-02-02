import { Events } from "./events.entity";
import { Friends } from "./friends.entity";
import { Offers } from "./offers.entity";
import { Plans } from "./plans.entity";
import { Profiles } from "./profiles.entity";
import { Referrals } from "./referrals.entity";
import { Restaurants } from "./restaurants.entity";
import { Stripe } from "./stripe.entity";
import { UsersEvents } from "./users_events.entity";
import { UsersPlans } from "./users_plans.entity";
import { UsersOffers } from "./users_offers.entity";
import { Users } from "./users.entity";

const entities = [Events, Friends, Offers, Plans, Profiles, Referrals, Restaurants, Stripe, UsersEvents, UsersPlans, UsersOffers, Users];

export {Events, Friends, Offers, Plans, Profiles, Referrals, Restaurants, Stripe, UsersEvents, UsersPlans, UsersOffers, Users};
export default entities;