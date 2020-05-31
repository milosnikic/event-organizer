(ns event-organizer.core
  (:require [toucan.db :as db]
            [toucan.models :as models]
            [ring.adapter.jetty :refer [run-jetty]]
            [compojure.api.sweet :refer [api routes]]
            [event-organizer.user :refer [user-routes]]
            [event-organizer.event :refer [event-routes]])
  (:gen-class))

(def db-spec
  {:dbtype "postgres"
   :dbname "event-organizer"
   :user "milos"
   :password "nikic"})


(def swagger-config
  {:ui "/swagger"
   :spec "/swagger.json"
   :options {:ui {:validatorUrl nil}
             :data {:info {:version "1.0.0", :title "Event organizer API"}}}})

(def app (api {:swagger swagger-config} (apply routes [user-routes event-routes])))

(defn -main
  [& args]
  (db/set-default-db-connection! db-spec)
  (models/set-root-namespace! 'event-organizer.models)
  (run-jetty app {:port 3000}))
