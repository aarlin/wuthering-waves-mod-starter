"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PositionPanel = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Info_1 = require("../../../../../Core/Common/Info"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	Net_1 = require("../../../../../Core/Net/Net"),
	BaseConfigController_1 = require("../../../../../Launcher/BaseConfig/BaseConfigController"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	EffectSystem_1 = require("../../../../Effect/EffectSystem"),
	Global_1 = require("../../../../Global"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	FeatureRestrictionTemplate_1 = require("../../../Common/FeatureRestrictionTemplate"),
	BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class PositionPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
	constructor() {
		super(...arguments),
			(this.rZe = void 0),
			(this.nZe = void 0),
			(this.sZe = !0),
			(this.aZe = ""),
			(this.hZe = 500),
			(this.pk = 0),
			(this.ShowPlayerPosition = () => {
				(this.sZe = !this.sZe), this.rZe.SetUIActive(this.sZe);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
		];
	}
	OnStart() {
		(this.rZe = this.GetText(0)),
			(this.nZe = this.GetText(1)),
			Info_1.Info.IsBuildShipping && (this.sZe = !1),
			this.rZe.SetUIActive(this.sZe);
	}
	AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ShowPlayerPosition,
			this.ShowPlayerPosition,
		);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ShowPlayerPosition,
			this.ShowPlayerPosition,
		);
	}
	OnBeforeDestroy() {
		this.rZe = void 0;
	}
	OnTickBattleChildViewPanel(e) {
		var t, i;
		Global_1.Global.BaseCharacter &&
			((t =
				Global_1.Global.BaseCharacter.CharacterActorComponent
					.ActorLocationProxy),
			([e, t, i] =
				(this.sZe && this.lZe(t, e),
				[
					(t.X / 100).toFixed(0),
					(t.Y / 100).toFixed(0),
					(t.Z / 100).toFixed(0),
				])),
			this.nZe.SetText(e + `,${t},` + i));
	}
	lZe(e, t) {
		var i = e.X.toFixed(0),
			o = e.Y.toFixed(0),
			r = ((e = e.Z.toFixed(0)), TimeUtil_1.TimeUtil.DateFormat5(new Date())),
			s = TimeUtil_1.TimeUtil.DateFormat5(
				new Date(TimeUtil_1.TimeUtil.GetServerTimeStamp()),
			),
			a =
				10 < Net_1.Net.MessageCacheSize
					? "\n协议缓存队列长度:" + Net_1.Net.MessageCacheSize
					: "",
			n = (1e3 / t).toFixed(0),
			l = ActorSystem_1.ActorSystem.Size,
			f = ActorSystem_1.ActorSystem.Capacity,
			m =
				BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
					"Stream",
				),
			c = ModelManager_1.ModelManager.BulletModel?.GetBulletEntityMap().size;
		(this.pk += t),
			this.pk > this.hZe && ((this.pk = 0), this.UpdateEffectState());
		let S =
			`Fps:${n} Pos: ${i},${o},${e}\nCTime:${r} STime:${s}\nGTime:` +
			ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString;
		FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check() ||
			(S =
				`${S} ServerIp:${ModelManager_1.ModelManager.LoginModel.Platform}${a}${this.aZe}\nActorPool:${l}/${f} Branch:${m} Bullet:` +
				c),
			this.rZe.SetText(S);
	}
	UpdateEffectState() {
		var e = EffectSystem_1.EffectSystem.GetEffectCount(),
			t = EffectSystem_1.EffectSystem.GetActiveEffectCount(),
			i = EffectSystem_1.EffectSystem.GetEffectLruSize(),
			o = EffectSystem_1.EffectSystem.GetEffectLruCapacity(),
			r = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(0),
			s = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(1),
			a = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(2),
			n = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(3);
		this.aZe = `\nEffect: ${e}(${t}) Pool:${i}/${o}(${r})(${s})(${a})(${n})`;
	}
}
(exports.PositionPanel = PositionPanel).aYe = void 0;
