"use strict";
var ETriggerEvent;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.INVALID_TRIGGER_HANDLE = exports.ETriggerEvent = void 0),
	(function (e) {
		(e[(e.BeHitTrigger = 0)] = "BeHitTrigger"),
			(e[(e.HitTrigger = 1)] = "HitTrigger"),
			(e[(e.AttributeChangedTrigger = 2)] = "AttributeChangedTrigger"),
			(e[(e.TeamAttributeChangeTrigger = 3)] = "TeamAttributeChangeTrigger"),
			(e[(e.TagTrigger = 4)] = "TagTrigger"),
			(e[(e.LimitDodgeTrigger = 5)] = "LimitDodgeTrigger"),
			(e[(e.SkillTrigger = 6)] = "SkillTrigger"),
			(e[(e.DamageTrigger = 7)] = "DamageTrigger"),
			(e[(e["temp_hittrigger1.0"] = 10)] = "temp_hittrigger1.0"),
			(e[(e.BeDamageTrigger = 8)] = "BeDamageTrigger");
	})((ETriggerEvent = exports.ETriggerEvent || (exports.ETriggerEvent = {}))),
	(exports.INVALID_TRIGGER_HANDLE = -1);
