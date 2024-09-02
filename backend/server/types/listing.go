package types

import (
	"time"
)

type Listing struct {
	Id        uint `gorm:"primaryKey"`
	Category  string
	Name      string
	Quantity  float64
	CreatedAt time.Time
	UpdatedAt time.Time
}
