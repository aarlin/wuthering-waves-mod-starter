"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.inputDistributeSetups = void 0);
const BlockInputDistribute_1 = require("./InputDistributeSetup/BlockInputDistribute"),
	CreateCharacterInputDistribute_1 = require("./InputDistributeSetup/CreateCharacterInputDistribute"),
	ExploreInputDistribute_1 = require("./InputDistributeSetup/ExploreInputDistribute"),
	FightInputDistribute_1 = require("./InputDistributeSetup/FightInputDistribute"),
	GuideInputDistributeSetup_1 = require("./InputDistributeSetup/GuideInputDistributeSetup"),
	InteractionInputDistribute_1 = require("./InputDistributeSetup/InteractionInputDistribute"),
	LevelEventInputDistribute_1 = require("./InputDistributeSetup/LevelEventInputDistribute"),
	LoginInputDistribute_1 = require("./InputDistributeSetup/LoginInputDistribute"),
	PlotInputDistribute_1 = require("./InputDistributeSetup/PlotInputDistribute"),
	ReconnectInputDistribute_1 = require("./InputDistributeSetup/ReconnectInputDistribute"),
	UiInputDistribute_1 = require("./InputDistributeSetup/UiInputDistribute"),
	UiProhibitFightInputDistribute_1 = require("./InputDistributeSetup/UiProhibitFightInputDistribute");
exports.inputDistributeSetups = [
	BlockInputDistribute_1.BlockInputDistribute,
	ReconnectInputDistribute_1.ReconnectInputDistribute,
	PlotInputDistribute_1.PlotInputDistribute,
	GuideInputDistributeSetup_1.GuideInputDistributeSetup,
	CreateCharacterInputDistribute_1.CreateCharacterInputDistribute,
	LoginInputDistribute_1.LoginInputDistribute,
	UiProhibitFightInputDistribute_1.UiProhibitFightInputDistribute,
	LevelEventInputDistribute_1.LevelEventInputDistribute,
	InteractionInputDistribute_1.InteractionInputDistribute,
	ExploreInputDistribute_1.ExploreInputDistribute,
	FightInputDistribute_1.FightInputDistribute,
	UiInputDistribute_1.UiInputDistribute,
];
