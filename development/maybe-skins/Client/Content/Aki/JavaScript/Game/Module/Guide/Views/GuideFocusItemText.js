"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FocusItemText = void 0);
const UE = require("ue"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	GuideCountDownItem_1 = require("./GuideCountDownItem"),
	GuideDescribeNew_1 = require("./GuideDescribeNew");
class FocusItemText extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.XJt = 0),
			(this.$Jt = !0),
			(this.ZBt = void 0),
			(this.YJt = void 0),
			(this.OKt = void 0),
			(this.JJt = () => {
				this.XJt = 1;
			}),
			(this.OKt = t),
			(this.YJt = t.Owner);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIHorizontalLayout],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIHorizontalLayout],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UITexture],
		];
	}
	OnStart() {
		var t = this.YJt.TotalDuration,
			e = this.GetItem(8);
		0 < t
			? ((this.ZBt = new GuideCountDownItem_1.GuideCountDownItem(t)),
				this.ZBt.Init(e),
				e.SetUIActive(!0))
			: e.SetUIActive(!1),
			this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector);
	}
	ShowText() {
		var t = this.GetText(7),
			e =
				((t =
					(this.GetHorizontalLayout(3).OnRebuildLayoutDelegate.Bind(this.JJt),
					new GuideDescribeNew_1.GuideDescribeNew(t))),
				this.YJt.GetFocusViewConf()),
			i =
				((this.$Jt = e.TextInScreen),
				t.SetUpText(e.Content, ...e.Button),
				this.GetItem(1)),
			o = this.GetItem(2),
			s = this.GetItem(4),
			n = this.GetItem(5);
		if (
			(i.SetUIActive(!1),
			o.SetUIActive(!1),
			s.SetUIActive(!1),
			n.SetUIActive(!1),
			e.ShowArrow)
		)
			switch (e.ContentDirection) {
				case "D":
					i.SetUIActive(!0);
					break;
				case "U":
					o.SetUIActive(!0);
					break;
				case "L":
					n.SetUIActive(!0);
					break;
				case "R":
					s.SetUIActive(!0);
			}
		(t = e.RoleHeadId)
			? ((e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)),
				this.SetTextureByPath(e.RoleHeadIconBig, this.GetTexture(11)),
				this.GetItem(10).SetUIActive(!0))
			: this.GetItem(10).SetUIActive(!1);
	}
	OnTick(t) {
		this.zJt(), this.ZJt();
	}
	zJt() {
		var t = this.OKt.RectItem,
			e = this.GetHorizontalLayout(3),
			i = this.YJt.GetFocusViewConf(),
			o = e.RootUIComp.K2_GetComponentScale().X;
		let s = 0;
		var n = this.RootItem;
		switch (i.ContentDirection) {
			case "U":
				(s = t.Height + n.Height), (s *= 0.5), n.SetAnchorOffsetY(s);
				break;
			case "D":
				(s = t.Height + n.Height), (s *= 0.5), n.SetAnchorOffsetY(-s);
				break;
			case "L":
				(s = t.Width + e.RootUIComp.Width * o),
					(s *= 0.5),
					n.SetAnchorOffsetX(-s);
				break;
			case "R":
				(s = t.Width + e.RootUIComp.Width * o),
					(s *= 0.5),
					n.SetAnchorOffsetX(s);
				break;
			case "CT":
				var a =
					ConfigManager_1.ConfigManager.GuideConfig.GetGuideFocusCenterTextPos();
				n.K2_SetWorldLocation(a, !1, void 0, !1);
		}
		(i = this.GetText(7)).GetWidth() > FocusItemText.ezt &&
			(i.SetWidth(FocusItemText.ezt), i.SetOverflowType(1));
	}
	ZJt() {
		if (!(!this.$Jt || this.XJt <= 0 || 0 < --this.XJt)) {
			var t = this.GetHorizontalLayout(3).RootUIComp,
				e = t.K2_GetComponentLocation(),
				i = this.RootItem.K2_GetComponentLocation(),
				o = (s = t.K2_GetComponentScale()).X,
				s = s.Y,
				n = (r = UiLayer_1.UiLayer.UiRootItem).Width,
				a = r.Height,
				r = r.K2_GetComponentLocation(),
				h = ((n = n / 2), (a = a / 2), t.Width),
				c = t.Height;
			let I = r.X - n + (t.GetPivot().X * h + FocusItemText.tzt) * o,
				U = r.X + n - ((1 - t.GetPivot().X) * h + FocusItemText.tzt) * o,
				u = r.Y - a + (t.GetPivot().Y * c + FocusItemText.izt) * s,
				m = r.Y + a - ((1 - t.GetPivot().Y) * c + FocusItemText.izt) * s;
			I > U && ((I += U), (U = I - U), (I -= U)),
				u > m && ((u += m), (m = u - m), (u -= m)),
				(e.X = MathUtils_1.MathUtils.Clamp(i.X, I, U)),
				(e.Y = MathUtils_1.MathUtils.Clamp(e.Y, u, m)),
				t.K2_SetWorldLocation(e, !1, void 0, !1),
				this.GetVerticalLayout(0).SetEnable(!1);
		}
	}
	OnDurationChange(t) {
		this.ZBt && this.ZBt.OnDurationChange(t);
	}
	OnBaseViewCloseWhenFinish() {
		this.ZBt?.SetActive(!1), this.GetItem(9).SetUIActive(!0);
	}
}
((exports.FocusItemText = FocusItemText).tzt = 80),
	(FocusItemText.izt = 10),
	(FocusItemText.ezt = 1120);
