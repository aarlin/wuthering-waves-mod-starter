"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterDetectItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class MonsterDetectItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.b5e = void 0),
			(this.EVe = void 0);
	}
	BindCallback(e) {
		this.EVe = e;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UITexture],
		];
	}
	OnStart() {
		(this.b5e = this.GetExtendToggle(0)),
			this.b5e.OnStateChange.Add((e) => {
				this.yVe();
			}),
			this.b5e.SetToggleState(0),
			this.b5e.OnPostAudioEvent.Bind((e) => {
				e && this.PostClickAudioEvent(e);
			}),
			this.b5e.OnPostAudioStateEvent.Bind((e, t) => {
				t && this.PostClickAudioEvent(t);
			});
	}
	OnBeforeDestroy() {
		this.b5e.OnStateChange.Clear(),
			this.b5e.OnPostAudioEvent.Unbind(),
			this.b5e.OnPostAudioStateEvent.Unbind();
	}
	Refresh(e, t, i) {
		this.Pe = e;
		var o,
			s = this.GetItem(2),
			n = this.GetTexture(3);
		e.IsLock
			? (LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(1),
					"Text_UnDiscovered_Text",
				),
				s.SetUIActive(!0),
				n.SetUIActive(!1))
			: ((o =
					ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
						e.Conf.MonsterInfoId,
					)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), o.Name),
				s.SetUIActive(!1),
				n.SetUIActive(!0),
				this.SetTextureByPath(o.Icon, n)),
			this.RootItem.SetUIActive(!0),
			(s =
				ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId ===
				e.Conf.Id);
		this.IVe(s, !1), s && this.yVe();
	}
	OnSelected(e) {
		this.IVe(!0);
	}
	OnDeselected(e) {
		this.IVe(!1);
	}
	yVe() {
		this.EVe && this.EVe(this.Pe.Conf.Id, this.b5e);
	}
	IVe(e, t = !0) {
		e ? this.b5e.SetToggleState(1, t) : this.b5e.SetToggleState(0, !1);
	}
}
exports.MonsterDetectItem = MonsterDetectItem;
