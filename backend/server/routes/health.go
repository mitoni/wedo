package routes

import "net/http"

func (app *Application) Health(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
}
