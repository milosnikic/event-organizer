(ns event-organizer.event
  (:require [schema.core :as s]
            [event-organizer.string-util :as str]
            [event-organizer.models.event :refer [Event]]
            [clojure.set :refer [rename-keys]]
            [toucan.db :as db]
            [ring.util.http-response :refer [created ok not-found]]
            [compojure.api.sweet :refer [POST GET PUT DELETE]])
  (:import java.time.LocalDate))

  ; Event request schema
(defn valid-name? [name]
  (str/non-blank-with-length? 3 80 name))


(s/defschema EventRequestSchema
  {:name (s/constrained s/Str valid-name?)
   :start (s/maybe LocalDate)
   :end (s/maybe LocalDate)
   :primary s/Str
   :secondary s/Str
   :user_id s/Int})

  ; Event create API
(defn id->created [id]
  (created (str "/events/" id) {:id id}))

  ; Event get api
(defn event->response [event]
  (if event
    (ok event)
    (not-found)))


  ; Create event handler
(defn create-event-handler [create-event-req]
  (-> (db/insert! Event create-event-req)
      :id
      id->created))

  ; Get event handler
(defn get-event-handler [event-id]
  (-> (Event event-id)
      event->response))

  ; Get all events handler
(defn get-events-handler []
  (ok (db/select Event)))

  ; Update event handler
(defn update-event-handler [id update-event-req]
  (db/update! Event id update-event-req)
  (ok))

  ; Delete event handler
(defn delete-event-handler [event-id]
  (db/delete! Event :id event-id)
  (ok))

  ; event routes                                                                                                                                                                                                                    
(def event-routes
  [(POST "/events" []
     :body [create-event-req EventRequestSchema]
     (create-event-handler create-event-req))
   (GET "/events/:id" []
     :path-params [id :- s/Int]
     (get-event-handler id))                                                                                                                  
   (GET "/events" []
     (get-events-handler))
   (PUT "/events/:id" []
     :path-params [id :- s/Int]
     :body [update-event-req EventRequestSchema]
     (update-event-handler id update-event-req))
   (DELETE "/events/:id" []
     :path-params [id :- s/Int]
     (delete-event-handler id))])

